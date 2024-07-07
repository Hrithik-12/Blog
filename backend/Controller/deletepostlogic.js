const PostModal = require("../db/PostModal");
const errorhandler = require("../utils/errorhandeler")

const postdelete=async (req,res,next)=>{
  if(!req.user.isAdmin || req.user.id !==req.params.userId ){
    return next(errorhandler(403,'you are not allowed to delete this post'));
  }
  try{

    await PostModal.findByIdAndDelete(req.params.postsId);
    res.status(200).json('the post has been deleted');
  }catch(error){
    next(error);
  }

}

module.exports=postdelete