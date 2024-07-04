const errorhandler = require("../utils/errorhandeler")
const PostModal=require('../db/PostModal.js')

const postcreate=async (req,res,next)=>{

 if(!req.user.isAdmin){
  return next(errorhandler(401,'Not Allowed to create Post'))
 }

 if(!req.body.title || !req.body.content){
  return next(errorhandler(201,'Please fill the all required Fields...'))
 }

 const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g,' ');

 const newPost=new PostModal({
  ...req.body,
  slug,
  userId:req.user.id,
 });

 try{
 const savedPost= await newPost.save();
 res.status(200).json(savedPost)
 }catch(error){
  next(error);
 }

}

module.exports=postcreate