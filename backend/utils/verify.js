const jwt=require('jsonwebtoken');
const errorhandler = require('./errorhandeler');
const VerifyToken=async(req,res,next)=>{

  const token=req.cookies.access_token;
  console.log(token);

  if(!token){
    return next(errorhandler(401,"Unauthorized Access! Please Login First "));
  }

  // verify the token

  jwt.verify(token,'secret',(err,user)=>{
    if(err){
      return next(errorhandler(401,"He He He!! Sign Up First"))
    }
    req.user=user;
    next();
  })


}

module.exports=VerifyToken