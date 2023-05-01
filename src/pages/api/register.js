import mongoose from "mongoose";
let User = mongoose.model("User")
import { bucket } from "@/middlewares/imageUpload"
import bcrypt from "bcrypt";
import { connectDB } from "@/database/db";




export default async function signup (req, res) {
  if(connectDB){

    try{
      const password = req.body.password;
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
    
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: passwordHash,
        profilePicture: "",
      })
      const file = req.file;
      if(file.mimetype.startsWith("image/")){
        const {originalname, buffer} = file;
        const timestamp = new Date().getTime();
        const blob = bucket.file(`${timestamp}_${originalname.replace(/ /g, "_")}`);
        const blobStream = blob.createWriteStream({
          resumable:false,
        });
        blobStream.on("error",(err) => {
          console.error(err);
        });
        blobStream.on("finish", async () => {
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
          user.profilePicture = publicUrl;
          await user.save();
          res.status(200).json({msg: "Successfully registered"})
        });
        blobStream.end(buffer);
      } else{
        res.status(404).json({msg: "You need to select an image."})
      }
    } catch(err){
      res.status(400).json(err);
    }
  }

}
