const Usermodal = require("../db/User");
const errorhandler = require("../utils/errorhandeler");
const bcryptjs=require('bcryptjs')

const Updatelogic=async (req,res,next)=>{

  console.log(req.user);
  console.log(req.params.id)
  if(req.user.id!==req.params.id){
     return next(errorhandler(403,"You are only allow to update your profile"));
  }

  let passFromDashboard=req.body.password

  if(passFromDashboard){
    if(passFromDashboard.length<6){
      return next(errorhandler(400,"Password Must Be at least 6 characters"));
    }

    passFromDashboard=bcryptjs.hashSync(passFromDashboard,10);
  }
  
  const UsernamefromDashboard=req.body.name

  if(UsernamefromDashboard){
    if(UsernamefromDashboard.length<3 || UsernamefromDashboard.length>20){
      return next(errorhandler(400,'Username Shuld be in between 3 and 20 Characters'))
    }
    // we can check more case like it does not conatin any special characters or space lower case
    if(!UsernamefromDashboard.match(/^[a-zA-Z0-9]/)){
      return next(errorhandler(400,'Does Not Conatin Any Special Characters In User Name'))
    }
  }

  try{
    const UpdatedUser=await Usermodal.findByIdAndUpdate(req.params.id,{
      $set:{
        name:req.body.name,
        email:req.body.email,
        image:req.body.image,
        password:passFromDashboard
      }
    },{
      new:true
    });
    const {password:hash,...rest}=UpdatedUser._doc
    
    res.status(200).json(rest);
;
  }catch(error){
    next(error)
  }


}

module.exports=Updatelogic