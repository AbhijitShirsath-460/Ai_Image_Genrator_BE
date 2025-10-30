import express from 'express'
import { createPost } from '../controller/createPost.controller.js';
import { generateImage } from '../controller/genrateImage.controller.js';
import { getAllPosts } from '../controller/getAllPost.controller.js';

const router = express.Router();


//get all post
router.get("/", getAllPosts);

//create post
router.post("/post" , createPost)

//genrate image
router.post("/genrate-image", generateImage)

export default router

