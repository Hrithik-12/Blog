const PostModal = require("../db/PostModal");

const getpost=async (req,res,next)=>{

  try{
    // indexing the post as sometime we want recent post
    const startindex=parseInt(req.query.startindex || 0);
    const limit=parseInt(req.query.limit) || 9;
    const sortDirection=req.query.order==='asc' ? 1:-1; // 1---> mongo db show ascending while -1---->descending
    const posts=await PostModal.find({
      // 
      ...(req.query.userId && {userId:req.query.userId}),
      ...(req.query.category && {userId:req.query.category}),
      ...(req.query.slug && {userId:req.query.slug}),
      ...(req.query.postId && {_id:req.query.postId}),
      ...(req.query.searchTerm && {
          $or:[
            // it help to search between title or content the $option allow that lower or smaal case of letter is not mandatory
            {title:{$regex:req.query.searchTerm,$options:"i"}},
            {content:{$regex:req.query.searchTerm,$options:"i"}}
          ],

      })


  }).sort({updatedAt:sortDirection}).skip(startindex).limit(limit);

  // for getting tottal post
  const totalpost=await PostModal.countDocuments();
  const now=new Date();
  const oneMonthAgo=new Date(
    now.getFullYear(),
    now.getMonth()-1,
    now.getDate()
  );

  const lastmonthpost=await PostModal.countDocuments(
    {
      createdAt:{$gte:oneMonthAgo} // gte for greater than
    }
  )

  res.status(200).json({
    posts,
    totalpost,
    lastmonthpost
  })

  }catch(error){
    next(error)
  }

}

module.exports=getpost