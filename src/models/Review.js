import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        game:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game"
        },
        rating:{
            type: Number,
            required:true,
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    }, {timestamps:true}
)

const Review = mongoose.model("Review", reviewSchema);
export default Review;