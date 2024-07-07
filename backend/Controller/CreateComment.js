const commentModel = require("../db/comment");
const errorhandler = require("../utils/errorhandeler");

const createComment=async (req,res,next)=>{

  try{
    const {content,postId,userId}=req.body;

    if(userId !==req.user.id){
      return next(errorhandler(403,'Ypu are not allowed to add this comment'));
    }

    const newComment=new commentModel({
      content,
      userId,
      postId,
      
    })

    await newComment.save();
    res.status(200).json('comment created')

    

  }catch(error){
    next(error)
  }
}

module.exports=createComment