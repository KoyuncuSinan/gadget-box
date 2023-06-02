import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname:{
            type: String ,
            required:true,
            min: 1,
            max: 50,
        },
        lastname:{
           type: String ,
            required:true,
            min:1,
            max:50,
        },
        username:{
           type: String ,
            required:true,
            min: 1,
            max: 50,
            unique: true   
        },
        email:{
          type: String ,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
           type: String ,
            required: true,
            min: 5,
            max: 16,
        },
        profilePicture: {
            type : String,
            required: true,
            default: "",
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
        followings: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: 0
        }],
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: 0
        }],
        games: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game"
        }]
    }, {timestamps:true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;