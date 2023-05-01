import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        review:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        },
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game"
        }
    },{timestamps:true}
)

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;