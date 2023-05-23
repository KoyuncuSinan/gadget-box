import mongoose from "mongoose";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { connectDB, closeConnection } from "../lib/db";
import formidable from "formidable"
import cloudinary from "@/pages/api/lib/middlewares/imageUpload";

export const config = {
  api: {
      bodyParser: false,
  },
};

export default async function register(req, res) {
  if (req.method !== 'POST') {
      return res.status(405).json({message: "Method not allowed."})
  }
  try{
    await connectDB();
  } catch(err){
    console.error("MongoDB connection error",err)
    return res.status(500).json({message: "Internal Server Error"})
  }

  const form = new formidable.IncomingForm({multiples:true})

  form.parse(req, async(err,fields, files) => {
    if(err){
      console.error("Formidable Error",err);
      return res.status(500).json({ message: "Internal Server Error"});
    }

    const firstname = Array.isArray(fields.firstname) ? fields.firstname[0] : fields.firstname;
    const lastname = Array.isArray(fields.lastname) ? fields.lastname[0] : fields.lastname;
    
    const username = Array.isArray(fields.username) ? fields.username[0] : fields.username;
    if(User.findOne({username: username})){
      return res.status(403).json({message: "Username already exists!."})
    }

    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    if(User.findOne({email: email})){
      return res.status(403).json({message: "Email already exists!."})
    }

    const password = Array.isArray(fields.password) ? fields.password[0] : fields.password;
    if(password.length < 5 ){
      res.status(400).json({message: "Password should be longer than 5 characters."})
    }


    

    console.log(fields)
    const profilePicture = Array.isArray(files.profilePicture) ? files.profilePicture[0] : files.profilePicture;
    console.log(files)
    if (!profilePicture) {
      console.error("Profile Picture not found");
      return res.status(400).json({ message: "Profile Picture is required" });
  } 
  
  try {
  const pictureUpload = await cloudinary.uploader.upload(profilePicture.filepath,{
    use_filename: true,
    unique_filename: true,
  })

  const publicUrl = cloudinary.url(pictureUpload.public_id)
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password.toString(), salt)
  const user = await new User({
    firstname,
    lastname,
    username,
    email,
    password: hashPassword,
    profilePicture: publicUrl
  });
  await user.save();
  closeConnection()
  return res.status(201).json({message: "User created successfully", user});
} catch (err) {
  console.error("Error while saving user data", err);
  return res.status(500).json({message: "Internal Server Error"});
}
});
}