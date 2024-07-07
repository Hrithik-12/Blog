const express=require('express');
const UserRouter=express.Router();
const updateLogic=require('../Controller/Updatecontroller.js');
const verifyToken=require('../utils/verify.js');
const Deletelogic=require('../Controller/delete.js');
const Signout=require('../Controller/Signout.js')
const getuserlogic=require('../Controller/getuserlogicfromdb.js');
const Usermodal = require('../db/User.js');
const errorhandler = require('../utils/errorhandeler.js');


UserRouter.put('/update/:id',verifyToken,updateLogic);
UserRouter.delete('/delete/:id',verifyToken,Deletelogic);
UserRouter.post('/signout',Signout);
UserRouter.get('/getusers',verifyToken,getuserlogic)
UserRouter.get('/:userId',async (req,res,next)=>{
  try{
    const user=await Usermodal.findById(req.params.userId);
    if(!user) return next(errorhandler(401,"User not found"))
    const {password:hash,...rest}=user._doc;
    res.status(200).json(rest)
  }catch(error){
    next(error)
  }
})


module.exports=UserRouter