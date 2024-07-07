const PostModal = require("../db/PostModal");

const updatepost=async (req,res,next)=>{
  if(!req.user.isAdmin || req.user.id !==req.params.userId ){
    return next(errorhandler(403,'you are not allowed to update this post'));
  }

  try{
    const updatedPost=await PostModal.findByIdAndUpdate(
      req.params.postsId,{
        $set:{
          title:req.body.title,
          content:req.body.content,
          category:req.body.category,
          image:req.body.image
        }
      },{
        new:true
      }
    )

    res.status(200).json(updatedPost)
  }catch(error){
    next(error)
  }

}

module.exports=updatepost