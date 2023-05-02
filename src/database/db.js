import { MongoClient } from "mongodb";
import mongoose from "mongoose";

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log("MongoDB connected!")
        return true
    }catch(err){
        console.error(err);
        process.exit(1)
    }
}

export {connectDB};