import mongoose from "mongoose";
import User from "../../models/User.js";
import { bucket } from "@/middlewares/imageUpload"
import bcrypt from "bcrypt";
import { connectDB } from "@/database/db";
import multer from "multer";

export const config = {
  api: {
      bodyParser: false,
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits:{
    fileSize: 10*1024*1024,
  }
});


export default async function register(req, res) {
  if (req.method === 'POST') {
    const db = await connectDB();
    if (db instanceof Error) {
      return res.status(500).send({ message: 'Internal server error.' });
    } else if (db) {
      try {
        // Use the multer middleware to handle file uploads
        upload.single('profilePicture')(req, res, async (err) => {
          if (err) {
            console.error(err);
            return res.status(400).send({ message: 'Error uploading file', error: err });
          }
          const { firstname, lastname, username, email, password } = req.body;
          const file = req.file;
          if (file.mimetype.startsWith("image/")) {
            const { originalname, buffer } = file;
            const timestamp = new Date().getTime();
            const blob = bucket.file(`${timestamp}_${originalname.replace(/ /g, "_")}`);
            const blobStream = blob.createWriteStream({
              resumable: false,
            });
            blobStream.on("error", (err) => {
              console.error(err);
            });
            blobStream.on("finish", async () => {
              const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
              const salt = bcrypt.genSalt(10)
              const passwordHash = await bcrypt.hash(password, salt);
              const user = new User({
                firstname,
                lastname,
                username,
                email,
                password: passwordHash,
                publicUrl,
              });
              await user.save();
              return res.status(200).send({ message: 'A user successfully created' });
            });
            blobStream.end(buffer);
          } else {
            console.error(err);
            res.status(400).send({ message: 'Registration failed', error: err });
          }
        });
      } catch (err) {
        console.error(err);
        res.status(400).send({ message: 'Registration failed', error: err });
      }
    }
  } else {
    res.status(405).send({ message: 'Method not allowed' });
  }
}