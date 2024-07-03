const Usermodal = require("../db/User")
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')

const google=async (req,res,next)=>{

  // if user exsist then sign in o/w sign up the user as our initial modal does not contain the imageurl then create this in usermodal 
  const {name,email,image}=req.body
  try{
    const userexsist=await Usermodal.findOne({email});
    if(userexsist){
      // generate token
      const token=jwt.sign({id:userexsist._id},'secret');
      const {password,...rest}=userexsist._doc;
      res.status(200).cookie('access_token',token,{
        httpOnly:true
      }).json(rest)
    }
    else{
      const genertaerandompass=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
      const hashed=bcryptjs.hashSync(genertaerandompass,10);
      const NewSignupuser=new Usermodal({
        name:name.toLowerCase().split(' ').join(' ')+Math.random().toString(9).slice(-6)  ,
        email,
        password:hashed,
        image
      });
      await NewSignupuser.save();
      const token=jwt.sign({id:NewSignupuser._id},'secret');
      const{password:hash,...rest}=NewSignupuser._doc
      res.status(200).cookie('access_token',token,{
        httpOnly:true
      }).json(rest)

    }
  }catch(error){
    next(error);

  }

}

module.exports=google