const commentModel = require("../db/comment")
const errorhandler = require("../utils/errorhandeler")

const getcomm=async (req,res,next)=>{
  if(!req.user.isAdmin) return next(errorhandler(401,'unauthorized access'))

  try{

    const startIndex=parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 0
    const sortDirection=req.query.sort==='desc' ? -1:1
    const comm=await commentModel.find().sort({createdAt:sortDirection}).skip(startIndex).limit(limit)

    const totalcomm=await commentModel.countDocuments();
    const now=new Date();
    const oneMonthAgo=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    const lastmonthcomm=await commentModel.countDocuments({createdAt:{$gte:oneMonthAgo}});

    res.status(200).json({comm,totalcomm,lastmonthcomm});


  }catch(error){
    next(error)
  }

}

module.exports=getcomm