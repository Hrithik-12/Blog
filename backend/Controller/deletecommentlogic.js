const commentModel = require("../db/comment");
const errorhandler = require("../utils/errorhandeler");

const deletecomm=async (req,res,next)=>{
  const comment=await commentModel.findById(req.params.commentId);
  console.log(comment)
 

  try{
    if(!comment){
      return next(errorhandler(404,'not found'))
    }
    if(comment.userId !== req.user.id && !req.user.isAdmin){
      return next(errorhandler(403,'You have not access to delete this comment'))
    }
    

    await commentModel.findByIdAndDelete(req.params.commentId);
    res.status(200).json("Comment is deleted")



  }catch(error){
    next(error)
  }

}
module.exports=deletecomm