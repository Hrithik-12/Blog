const mongoose=require('mongoose');

const PostSchema=mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true,
    unique:true
  },
  imagePost:{
    type:String,
    default:"https://img.freepik.com/free-photo/business-women-signature-document_1388-90.jpg?t=st=1720081782~exp=1720085382~hmac=be5d98984d62dee914b2ea80892787ba327facc2dc8e2c0929738721b6d4ee0d&w=1060"
  },
  categoty:{
    type:String,
    default:"uncategorized"
  },
  slug:{
    type:String,
    required:true,
    unique:true
  }
},{timestamps:true})

const PostModal=mongoose.model("Post",PostSchema)

module.exports=PostModal