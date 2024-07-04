const Usermodal = require("../db/User");
const errorhandler = require("../utils/errorhandeler");
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken')

const Signin=async (req,res,next)=>{

  // getting all request from body
  const {email,password}=req.body;

  if(!email || !password || email==="" || password===" ") return next(errorhandler(201,"All Fields Are Required"))

  try{
    const verifiedemail=await Usermodal.findOne({email});
    console.log(verifiedemail);

  if(!verifiedemail){
   return next(errorhandler(401,"Not Registerd! First Sign up"));
  }

  const verifiedpass=bcryptjs.compareSync(password,verifiedemail.password);

  if(!verifiedpass){
   return next(errorhandler(401,"Wrong Credentials"));
  }
   
  const token=jwt.sign({id:verifiedemail._id,isAdmin:verifiedemail.isAdmin},'secret');
  console.log(token);
  const {password:pass,...rest}=verifiedemail._doc;
  res.status(200).cookie('access_token',token,{
    httpOnly:true,

  }).json(rest)
  }catch(error){
    next(error);
  }

}

module.exports=Signin