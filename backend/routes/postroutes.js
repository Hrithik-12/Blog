const express=require('express');
const VerifyToken = require('../utils/verify');
const PostLogic=require('../Controller/PostLogic.js');
const getposts=require('../Controller/getpostscontrol.js')
const deletlogic=require('../Controller/deletepostlogic.js')
const updatepost=require('../Controller/UpdatePostlogic.js')

const postRouter=express.Router();

postRouter.post('/create-post', VerifyToken, PostLogic);
postRouter.get('/getposts',getposts);
postRouter.delete('/delete/:postsId/:userId',VerifyToken,deletlogic);
postRouter.put('/updatepost/:postsId/:userId',VerifyToken,updatepost);

module.exports=postRouter