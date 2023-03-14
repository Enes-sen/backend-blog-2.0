const express = require("express");
const router = express.Router();
const commentroutes = require("./commentroutes.js");

const { getposts,getsinglepost, createpost, deletepost } = require("../controllers/blogcontroller.js");
router.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.send("blog-api");

});
router.get("/posts", getposts);
router.get("/posts/:id", getsinglepost);
router.post("/posts", createpost);
router.delete("/posts/:id", deletepost);
router.use("/posts/comment/",commentroutes);

module.exports = router;
