import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        reviews:{
            type: String,
            required: true,
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
        likes: {
            type: Number,
            default: 0
        }
    }, {timestamps:true}
)

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;