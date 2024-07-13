const express=require('express')
const commentRouter=express.Router();
const commentLogic=require('../Controller/CreateComment')
const verifyToken=require('../utils/verify.js')
const getcomment=require('../Controller/getcomment.js')
const likecomments=require('../Controller/likecomments.js')
const deletecomment=require('../Controller/deletecommentlogic.js')
const getcomments=require('../Controller/getcommentslogic.js')

commentRouter.post('/create', verifyToken, commentLogic);
commentRouter.get('/allcomments/:postId',getcomment);
commentRouter.put('/like/:commentId',verifyToken,likecomments);
commentRouter.delete('/delete/:commentId',verifyToken,deletecomment)
commentRouter.get('/getcomments', verifyToken, getcomments)

module.exports=commentRouter