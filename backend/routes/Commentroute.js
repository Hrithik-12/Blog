const express=require('express')
const commentRouter=express.Router();
const commentLogic=require('../Controller/CreateComment')
const verifyToken=require('../utils/verify.js')

commentRouter.post('/create', verifyToken, commentLogic)

module.exports=commentRouter