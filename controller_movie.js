import jwt from "jsonwebtoken";
import Movie from "./model_movie.js"
import Admin from "./model_admin.js"
import mongoose from "mongoose";
export const addMovie= async(req,res,next)=>{
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    const extracted_token=req.headers.authorization.split(" ")[1];
    if(!extracted_token && extracted_token.trim()==="")
    {
        return res.status(404).json({message:"Token not found"});
    }
    let adminId;
    jwt.verify(extracted_token,process.env.secured_key,(err,decrypted)=>
    {
        if(err)
        {
            return res.status(400).json({message : `${err.message}`});
        }else{
            adminId = decrypted.id;
            return;
        } 
    });
    const {title,description,cast,releaseDate,posterUrl,genre,featured}=req.body;
    if(!title && title.trim()==="" && !description && description.trim()==="" && !posterUrl && posterUrl.trim()===""){
        return res.status(422).json({message:"Invalid Inputs"});
    }

    let movie;
    try 
    {
        movie= new Movie(
            {
                title,
                description,
                cast,
                releaseDate: new Date(`${releaseDate}`),
                posterUrl,
                genre,
                admin : adminId,
                featured
            }
            
            );
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({session});
    adminUser.addedMovies.push(movie);
    await adminUser.save({session});
    await session.commitTransaction();
    } 
    catch (error) 
    {
        return console.log(error); 
    }
    if(!movie)
    {
        return res.status(500).json({message:"Request Failed"});
    }
    return res.status(201).json({movie});
};

export const getMovies = async(req,res,next)=>{
    let movie;
    try {
        movie = await Movie.find();
    } catch (error) {
        return console.log(error);
    }
    if(!movie)
    return res.status(500).json({message:"Request Failed"});
    return res.status(200).json({movie});
};

export const getMovieById = async(req,res,next)=>{
    const id = req.params.id;
    let movie;
    try {
        movie= await Movie.findById(id)
    } catch (error) {
        return console.log(error);
    }
    if(!movie)
    return res.status(404).json({message:"Invalid Movie Id"});
    return res.status(200).json({movie});
};