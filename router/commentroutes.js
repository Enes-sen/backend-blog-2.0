const express = require("express");
const router = express.Router();
const { getPostComments, createComment, deleteComment } = require("../controllers/comentcontroller.js");

router.get("/:id", getPostComments);
router.post("/:id", createComment);
router.delete("/:id", deleteComment);

module.exports = router;
