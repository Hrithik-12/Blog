const express=require('express');
const VerifyToken = require('../utils/verify');
const PostLogic=require('../Controller/PostLogic.js')

const postRouter=express.Router();

postRouter.post('/create-post', VerifyToken, PostLogic);

module.exports=postRouter