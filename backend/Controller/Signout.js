const Signout=(req,res,next)=>{
  try{
    res.clearCookie('access_token').status(200).json("User has Successfully Sign Out !!")
  }catch(error){
    next(error);
  }



}

module.exports=Signout