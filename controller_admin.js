import model_admin from "./model_admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addAdmin = async (req,res,next)=>{
    const {email,password}=req.body;
    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({ message : "Invalid Inputs"});}    
    let e_admin;
    try {
        e_admin= await model_admin.findOne({email});
    } catch (error) {
        return console.log(error);
    } 
    if(e_admin)
    {
        return res.status(400).json({message:"Admin Exists"});
    }   
    let admin;
    const enpassword=bcrypt.hashSync(password);
    try {
        admin= new model_admin({email,password:enpassword});
        admin= await admin.save();
    } catch (error) {
        return console.log(error);
    }
    if(!admin)
    {
        return res.status(500).json({message:"Unable to store admin"});
    }
    return res.status(201).json({admin});
};

export const adminLogin=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email ||(email && email.trim()==="") && !password && password.trim()===""){
        return res.status(422).json({ message : "Invalid Inputs"});}    
    let e_admin;
    try {
        e_admin = await model_admin.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if(!e_admin)
    {
        return res.status(400).json({message:"Admin does not exists..!"});
    }
    if(!bcrypt.compareSync(password,e_admin.password))
    return res.status(400).json({ message : "Incorrect Password"});
//create and assign a token for the user
    const token = jwt.sign({id:e_admin._id},process.env.secured_key,{expiresIn:"7d",});
    return res.status(200).json({ message : "Authenticated",token,id:e_admin._id});
};

export const getAllAdmins = async(req,res,next)=>{
    let admins;
    try{
    admins=await model_admin.find();
    }catch(err){
        return console.log(err);
    }
    if(!admins)
    {
        return res.status(500).json({message:"Error Occured"});
    }
    return res.status(200).json({admins});
};

export const deleteAdmin = async(req, res, next)=>{
    const id=req.params.id;
    let admin;
    try{
    admin=await model_admin.findByIdAndDelete(id,{});
    }catch(err)
    {
        return console.log(err);
    }
    if(!admin)
    {
        return res.status(500).json({message:"Error Occured"});
    }
    return res.status(200).json({message : "Deleted Successfully"});
};

export const getAdminById = async(req,res,next)=>{
    const id = req.params.id;
    let admins;
    try{
        admins=await model_admin.findById(id).populate('addedMovies');
    }catch(err){
        return console.log(err);
    }
    if(!admins)
    {
        return res.status(500).json({message:"Error Occured"});
    }
    return res.status(200).json({admins});
};