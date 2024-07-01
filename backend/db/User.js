const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
  name:{
    type:String,
    unique:true,
    required:true,
  },
  email:{
    type:String,
    unique:true,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
},{timestamps:true});

const Usermodal=mongoose.model("User",UserSchema);


module.exports=Usermodal