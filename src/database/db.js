import { MongoClient } from "mongodb";

const uri = process.env.MONGODB.URI;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

async function connectDB(){
    if(!client.isConnected()){
        await client.connect();
    }
    return client.db("My Database")
}

export {connectDB};