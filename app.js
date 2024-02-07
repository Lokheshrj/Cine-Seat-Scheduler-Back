import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userrouter from "./route_user.js";
import adminrouter from "./route_admin.js";
import movierouter from "./route_movie.js";
import bookingRouter from "./route_booking.js";
import cors from 'cors';
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/user", userrouter);
app.use("/admin",adminrouter);
app.use("/movie",movierouter);
app.use("/booking",bookingRouter);
mongoose.connect(
    `mongodb+srv://lokheshrj:${process.env.db_pass}@cluster0.8ttolti.mongodb.net/?retryWrites=true&w=majority`
    ).then(()=>app.listen(5000,()=>console.log("Connected"))).catch((e)=> console.log(e));