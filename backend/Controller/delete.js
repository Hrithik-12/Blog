const Usermodal = require("../db/User");
const errorhandler = require("../utils/errorhandeler")

const Deletelogic=async(req,res,next)=>{


  if( !req.user.isAdmin && req.user.id!==req.params.id){
    return next(errorhandler(401,'You are not allowed to delete the account'));
  }

  try{
    await Usermodal.findByIdAndDelete(req.params.id);
    res.status(200).json({msg:"User Has been Deleted"})
  }catch(errro){
    next(error)
  }



}

module.exports=Deletelogic