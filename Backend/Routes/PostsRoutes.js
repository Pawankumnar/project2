//first we need mongoose to use our model
//const mongoose = require("mongoose");
// next we import our posts model
//const Posts = mongoose.model('posts');

const express = require('express');
//to create different routes
const router = express.Router();
//import the controllers file functions
const postController = require('../Controllers/PostController');

//use
router.get('/', postController.baseRoute);
router.get('/getposts',postController.getPosts);
// use 
//router.get('/', postController.baseRoute);

// create
router.post('/create', postController.createPost);

// read all
//router.get('/getPosts', postController.getPosts);

// read one
router.get('/getPosts/:id', postController.getSinglePost);

// update
router.put('/post/:id/update', postController.updatePost);

// delete
router.delete('/delete/:id', postController.deletePost);

//router.get('/getPosts',postController.getPosts);
// move router from app.js
//router.get('/',(req, res) => {
    //res.send("server Running");
//});
//route to get posts
//router.get('/getPosts', async (req, res) => {
   ///const posts = await Posts.find();
    //console.log(posts)
    //res.json(posts);
//})

module.exports =  router;