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
  image:{
    type:String,
    default:"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1719878400&semt=ais_user"
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
},{timestamps:true});

const Usermodal=mongoose.model("User",UserSchema);


module.exports=Usermodal