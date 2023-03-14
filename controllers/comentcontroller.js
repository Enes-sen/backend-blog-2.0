const Comment = require('../models/comment');
const Post = require('../models/post');

const getPostComments = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId).populate('comments');

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      });
      return;
    }

    res.status(200).json({ comments: post.comments });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

const createComment = async (req, res) => {
  const postId = req.params.id;
  const { name, comment } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found'
      });
      return;
    }

    const newComment = await Comment.create({ name, comment, postId });
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ newComment });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
      return;
    }

    const post = await Post.findById(comment.postId);
    post.comments.pull(commentId);
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

module.exports = {
  getPostComments,
  createComment,
  deleteComment
};
