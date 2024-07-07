const Usermodal = require("../db/User");
const errorhandler = require("../utils/errorhandeler")

const getuserlogic=async (req,res,next)=>{
  if(!req.user.isAdmin){
    return next(errorhandler(401,'Not allowed to see the users'));
  }

  try{
    const startindex=parseInt(req.query.startindex) || 0;
    const limit=parseInt(req.query.limit) || 9;
    const sortdirection=req.query.sort ==='asc' ? 1:-1;
    const users=await Usermodal.find().sort({createdAt:sortdirection}).skip(startindex).limit(limit)

    const userwithoutpassword=users.map((user)=>{
      const {password:has,...rest}=user._doc
      return rest
    })

    const usercount=await Usermodal.countDocuments();
    const now=new Date();

    const oneMonthAgo=new Date(
      now.getFullYear(),
      now.getMonth()-1,
      now.getDate()
    );

    const lastmonthuser=await Usermodal.countDocuments({
      createdAt:{$gte:oneMonthAgo}
    });

    res.status(200).json(
      {
        users:userwithoutpassword,
        totalusers:usercount,
        lastmonthuser
      }
    )


  }catch(error){
    next(error)
  }

}

module.exports=getuserlogic