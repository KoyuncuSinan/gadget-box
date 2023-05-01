import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

async function connectDB(){
    if(!client.isConnected()){
        await client.connect();
    }
    return client.db("gadget_box")
}

export {connectDB};