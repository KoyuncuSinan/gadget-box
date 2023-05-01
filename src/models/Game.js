import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true
        },
        releaseDate: {
            type: String,
            required:true
        },
        website:{
            type: String,
        },
        description:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required:true
        },
        reviews:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }],
        comments : [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }],
        reviewCount :{
            type: Number,
            required:true
        }
    }
)