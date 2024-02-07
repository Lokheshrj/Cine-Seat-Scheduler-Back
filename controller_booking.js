import mongoose from "mongoose";
import Booking from "./model_booking.js";
import Movie from "./model_movie.js";
import User from "./model_user.js";
export const booking = async(req,res,next)=>{
    const {movie,date,seatnumber,user} = req.body;

    let existingMovie;
    let existingUser;
    try 
    {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (error) 
    {
       return console.log(error); 
    }
    if(!existingMovie)
    return res.status(404).json({message:"Movie not found with given Id.."});

    if(!existingUser)
    return res.status(404).json({message:"User not found with given Id.."});
    

    let booking;
    try {
        booking = new Booking(
            {
                movie,
                date : new Date(`${date}`),
                seatnumber,
                user
            }
            );
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({session});
    await existingMovie.save({session});
    await booking.save({session});
    session.commitTransaction();
    } catch (error) {
        console.log(error);
    }
    if(!booking)
    return res.status(500).json({message:"Unable to Book Seats..!"});
    return res.status(201).json({booking: booking});
};

export const getBookingById = async(req,res,next)=>{
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!booking)
    return res.status(500).json({message:"Unexpected Error"});
    return res.status(200).json({booking});
};

export const deleteBooking = async(req,res,next) =>{
    const id = req.params.id;
    let booking;
    try {
       booking = await  Booking.findByIdAndDelete(id).populate("user movie");
       console.log(booking);
       const session = await mongoose.startSession();
       session.startTransaction();
       await booking.user.bookings.pull(booking);
       await booking.movie.bookings.pull(booking);
       await booking.movie.save({session});
       await booking.user.save({session});
       session.commitTransaction();
    } catch (error) {
        return console.log(error);
    }  
    if(!booking)
    return res.status(500).json({message:"Unable to Delete"});
    return res.status(200).json({message:"Successfully Deleted"});
};