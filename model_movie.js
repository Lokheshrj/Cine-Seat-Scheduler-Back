import mongoose from "mongoose";
const movieSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        description:{type:String,required:true},
        cast : [{type:String,required:true}],
        releaseDate:{type:Date,required:true},
        posterUrl:{type:String,required:true},
        genre:{type:String,required:true},
        featured:{type:Boolean},
        bookings:[{type:mongoose.Schema.Types.ObjectId,ref:"Booking"}],
        admin:{type:mongoose.Schema.Types.ObjectId,ref:"Admin",required:true}
    }
);
export default mongoose.model("Movie",movieSchema);