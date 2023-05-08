import { MongoClient } from "mongodb";
import mongoose from "mongoose";

let connection = {}

export async function connectDB(){
    if(connection.isConnected){
        console.log("Have connection");
        return connection;
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true, 
            useUnifiedTopology: true})
        
        console.log("MongoDB connected!")
        connection = db;
        return db;
    }catch(err){
        console.error('Error connecting to MongoDB', err);
        console.error(err)
    }
}

export async function closeConnection(){
    if(connection){
        console.log("Closing database connection");
        await mongoose.disconnect();

    }
}