const commentModel = require("../db/comment");
const errorhandler = require("../utils/errorhandeler");

const likecomment=async (req,res,next)=>{
  try{
    const comment=await commentModel.findById(req.params.commentId);
    if(!comment) return next(errorhandler(404,"Comment Not Found"));
    // check liking of user
    const userIndex=comment.likes.indexOf(req.user.id);
    if(userIndex===-1) {
      comment.numberofLikes+=1
      comment.likes.push(req.user.id)
     
    }else{
      comment.numberofLikes-=1
      comment.likes.splice(userIndex,1)
    }

    await comment.save()
    res.status(200).json(comment)

  }catch(error){
    next(error)

  }

}

module.exports=likecomment