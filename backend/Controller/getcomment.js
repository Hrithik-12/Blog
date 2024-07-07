const commentModel = require("../db/comment")

const getcommengt=async (req,res,next)=>{
  try{

    const comment=await commentModel.find({postId:req.params.postId}).sort({
      createdAt:-1
    })

    res.status(200).json(comment)

  }catch(error){
    next(error)
  }

}
module.exports=getcommengt