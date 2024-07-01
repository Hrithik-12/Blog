const express=require('express');
const signup=require('../Controller/Signupcontrol.js')

const router=express.Router();


router.post('/signup',signup);

module.exports=router