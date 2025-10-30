import Post from "../models/post.model.js";



//get all post
export const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find({});
      return res.status(200).json({ success: true, data: posts });

    } catch (error) {

    return res.status(500).json({
        message: error.message || message,
        error: true
    })

    }
  };