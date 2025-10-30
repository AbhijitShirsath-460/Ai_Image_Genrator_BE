import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.model.js";

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY  , 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  
});


// console.log("Cloudinary Config:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });


export const createPost = async (req, res) => {
  try {
    const { name, prompt , photo  } = req.body;


    console.log("req body " , {
       name,
       prompt,
       photo
    });
    
    console.log(req.files);
    
    

    const photoUrl = await cloudinary.uploader.upload(photo , {
      folder : "Ai_Image_Genrator",
      resource_type: "image"
    });

    console.log("Photo URL:", photoUrl.secure_url);
    
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl?.secure_url,
    });

    return res.status(201).json({ success: true, data: newPost });
    console.log("image upload in cloudinary result" , photoUrl);
    
  } catch (error) {

    return res.status(500).json({
      message: error.message || message,
      error: true
    })

  }
};