const express=require('express');
const signup=require('../Controller/Signupcontrol.js')
const signin=require('../Controller/Signincontroller.js')

const router=express.Router();


router.post('/signup',signup);
router.post('/signin',signin);

module.exports=router