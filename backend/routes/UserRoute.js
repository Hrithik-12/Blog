const express=require('express');
const UserRouter=express.Router();
const updateLogic=require('../Controller/Updatecontroller.js');
const verifyToken=require('../utils/verify.js');
const Deletelogic=require('../Controller/delete.js');
const Signout=require('../Controller/Signout.js')

UserRouter.put('/update/:id',verifyToken,updateLogic);
UserRouter.delete('/delete/:id',verifyToken,Deletelogic);
UserRouter.post('/signout',Signout)

module.exports=UserRouter