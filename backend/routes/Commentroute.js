const express=require('express')
const commentRouter=express.Router();
const commentLogic=require('../Controller/CreateComment')
const verifyToken=require('../utils/verify.js')
const getcomment=require('../Controller/getcomment.js')
const likecomments=require('../Controller/likecomments.js')

commentRouter.post('/create', verifyToken, commentLogic);
commentRouter.get('/allcomments/:postId',getcomment);
commentRouter.put('/like/:commentId',verifyToken,likecomments);

module.exports=commentRouter