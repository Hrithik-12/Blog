const express=require('express')
const commentRouter=express.Router();
const commentLogic=require('../Controller/CreateComment')
const verifyToken=require('../utils/verify.js')
const getcomment=require('../Controller/getcomment.js')

commentRouter.post('/create', verifyToken, commentLogic);
commentRouter.get('/allcomments/:postId',getcomment)

module.exports=commentRouter