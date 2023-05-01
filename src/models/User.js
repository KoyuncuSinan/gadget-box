import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstname:{
            type: String,
            required:true,
            min: 1,
            max: 50,
        },
        lastname:{
            type: String,
            required:true,
            min:1,
            max:50,
        },
        username:{
            type: String,
            required:true,
            min: 1,
            max: 50,
            unique: true   
        },
        email:{
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
            max: 16,
        },
        profilePicture: {
            type: String,
            required: true,
            default: "",
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reviews"
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }],
        followings: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        games: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Games"
        }]
    }, {timestamps:true}
)

const User = mongoose.model("User",UserSchema);
export default User;