const Post = require("../models/post.js");

//getposts,createpost,setpost,deletepost
const getposts = async (req, res) => {
 try {
    const posts = await Post.find({});
    res.status(200).json(posts);
 } catch (error) {
    res.status(500).json({
        success: false,
        error
    });
 }
};
const getsinglepost = async (req, res) => {
    try {
        const {id:_id } = req.params;
       const post = await Post.findById(_id);
       res.status(200).json(post);
    } catch (error) {
       res.status(500).json({
           success: false,
           error
       });
    }
   };

const createpost = async (req, res) => {
    const post = req.body;

    try {
        const newPost = await Post.create(post);
        res.status(201).json({ newPost });
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
};

const deletepost = async (req, res) => {
    const { id:_id } = req.params;

    try {
        const deletedPost = await Post.findByIdAndDelete(_id);
        if (!deletedPost) {
            res.status(404).json({
                success: false,
                message: "Post not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
};

module.exports = {
  getposts,
  getsinglepost,
  createpost,
  deletepost,
};
