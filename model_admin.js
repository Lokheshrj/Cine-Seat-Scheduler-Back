import mongoose from "mongoose";
const Schema=mongoose.Schema;
const adminSchema= new Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            minLength:8,
        },
        addedMovies:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Movie",
            },
        ],
    }
);
export default mongoose.model("Admin",adminSchema);