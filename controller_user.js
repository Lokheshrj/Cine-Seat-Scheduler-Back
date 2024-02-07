import User from "./model_user.js";
import Booking from "./model_booking.js";
import bcrypt from "bcryptjs";
export const getAllUsers = async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){
        return console.log(err);
    }
    if(!users)
    {
        return res.status(500).json({message:"Error Occured"});
    }
    return res.status(200).json({users});
};

export const signUp = async (req,res,next)=>{
    const {name,email,password} = req.body;
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
    return res.status(422).json({ message : "Invalid Inputs"});}
    const enpassword= bcrypt.hashSync(password);
    let user;
    try{
        user= new User({name, email, password:enpassword});
        user= await user.save();
    }catch(err)
    {
        return console.log(err);
    }
    if(!user)
    {
        return res.status(500).json({message:"Error Occured"});
    }
    return res.status(201).json({id:user._id});
};

export const updateUser = async(req,res,next)=>{
    const id=req.params.id;
    const {name,email,password} = req.body;
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
    return res.status(422).json({ message : "Invalid Inputs"});}
    const enpassword= bcrypt.hashSync(password);
    let user;
    try{
        user= await User.findByIdAndUpdate(id,{name,email,password: enpassword});
    }catch(e)
    {
        return console.log(e);
    }
    if(!user)
    {
        return res.status(500).json({message:"Error Occured"});
    }
    return res.status(200).json({message : "Updated Successfully"});
};

export const deleteUser = async(req, res, next)=>{
    const id=req.params.id;
    let user;
    try{
    user=await User.findByIdAndDelete(id,{});
    }catch(err)
    {
        return console.log(err);
    }
    if(!user)
    {
        return res.status(500).json({message:"Error Occured"});
    }
    return res.status(200).json({message : "Deleted Successfully"});
};

export const login = async(req,res,next)=>{
    const {email,password}= req.body;
    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({ message : "Invalid Inputs"});}
    let user;
    try {
        user= await User.findOne({email});
    } catch (e) {
        return console.log(e);
    }
    if(!user)
    {
        return res.status(404).json({message : 'User Does not Exists'})
    }

    if(!bcrypt.compareSync(password,user.password))
    return res.status(400).json({ message : "Incorrect Password"});
    return res.status(200).json({ message : "Login Successful",id:user._id});
    
};

export const getBookingsOfUser = async(req,res,next)=>{
    const id =req.params.id;
    let booking;
    try {
       booking = await Booking.find({user:id}).populate('movie').populate('user');;
    } catch (error) {
       return console.log(error);
    }
    if(!booking)
    return res.status(500).json({ message : "Unable to get Bookings"});
    return res.status(200).json({booking});
};

export const getUserById = async(req,res,next)=>{
    const id = req.params.id;
    let user;
    try{
        user=await User.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!user)
    {
        return res.status(500).json({message:"Error Occured"});
    }
    return res.status(200).json({user});
};