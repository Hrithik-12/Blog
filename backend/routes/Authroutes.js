const express=require('express');
const signup=require('../Controller/Signupcontrol.js')
const signin=require('../Controller/Signincontroller.js')
const google=require('../Controller/googlecontrol.js')

const router=express.Router();


router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google)

module.exports=router