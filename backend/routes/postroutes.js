const express=require('express');
const VerifyToken = require('../utils/verify');
const PostLogic=require('../Controller/PostLogic.js');
const getposts=require('../Controller/getpostscontrol.js')

const postRouter=express.Router();

postRouter.post('/create-post', VerifyToken, PostLogic);
postRouter.get('/getposts',getposts);

module.exports=postRouter