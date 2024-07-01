const Usermodal = require("../db/User");
const errorhandler = require("../utils/errorhandeler");
const bcryptjs=require('bcryptjs')

const Signup=async (req,res,next)=>{
  const {name,email,password}=req.body;
  if(!name || !email || !password || name==="" || email==="" || password===" "){
    return next(errorhandler(201,"ALL FIELDS ARE REQUIRED..."))
  }

  // hash the password 
  const hashpassword=bcryptjs.hashSync(password,10);

    const newUser=new Usermodal({name,email,password:hashpassword});

    try{
      await newUser.save();
  
    res.status(200).json({msg:"User created successfully..."})
    }catch(error){
      next(errorhandler(201,"user Exsist Please Signin To Continue !!"));
    }
  }


 



module.exports=Signup