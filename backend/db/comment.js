const mongoose=require('mongoose');

const CommentSchema=new mongoose.Schema({
  content:{
    type:String,
    required:true
  },
  postId:{
    type:String,
    required:true
  },
  userId:{
    type:String,
    required:true
  },
  likes:{
    type:Array,
    default:[]
  },
  numberofLikes:{
    type:Number,
    default:0
  }

  
},{timestamps:true})

const commentModel=mongoose.model('Comment',CommentSchema);

module.exports=commentModel