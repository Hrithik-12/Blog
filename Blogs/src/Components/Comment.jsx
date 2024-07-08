
import { Button, Textarea} from 'flowbite-react'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Commentscom from './Commentscom'
function Comment({postId}) {
  const {currentUser}=useSelector(state=>state.user)
  const[comment,setComment]=useState('');
  const [commentfromdb,setCommentfromdb]=useState([]);
  const navigate=useNavigate()
  
  const handlesubmit=async (e)=>{
    // lets make api route for this
    e.preventDefault()
    if(comment.length >200){
      return;
    }
    try{
      const res=await fetch('/auth/comment/create',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({content:comment,userId:currentUser._id,postId})
      });
      const data=await res.json();
      if(res.ok){
        setComment('');
        console.log(data);
        // this will allow delaying
        setCommentfromdb([data,...commentfromdb]);
      }
      

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{

    const getallcomment=async ()=>{
      try{
        const res=await fetch(`/auth/comment/allcomments/${postId}`);
        const data=await res.json();
        if(res.ok){
          setCommentfromdb(data)
        }

      }catch(error){
        console.log(error)
      }

    }

    getallcomment()


  },[postId]);

  const handlelikes=async (commentId)=>{
    if(!currentUser){
      navigate('/signin');
      return
    }

    try{

      const res=await fetch(`/auth/comment/like/${commentId}`,{
        method:"PUT"
      }
        
      );

      const data=await res.json();
      if(res.ok){
        setCommentfromdb(commentfromdb.map((co)=>
          co._id === commentId ? {
            ...co,
            likes:data.likes,
            numberoflikes:data.likes.length
          }:co

        ))
      }

    }catch(error){
      console.log(error)
    }



  }




  return (
    <div className='max-w-2xl mx-auto w-full p-3'>{

      
        currentUser ? (<div className='flex items-center gap-1 my-5 text-gray-400 text-sm'>
          <p>Signed in as:</p>
          <img className='h-5 w-5 object-cover rounded-full' src={currentUser.image} />
          <Link to={'/dashboard?tab=profile'} className='text-sm text-cyan-500 hover:underline' >
          @{currentUser.name}
          </Link>

        </div>):(<div className='text-teal-500 my-5 text-sm flex gap-1'>
          you must be signed in to continue
          <Link className='text-blue-500 hover:underline' to={'/signin'} >
          Sign in
          </Link>
        </div>)
        
      


      }

      {
        currentUser && (
          <form onSubmit={handlesubmit} className='border border-teal-400 rounded-md p-3'>
            <Textarea placeholder='Add a comment' rows={'3'} maxLength={'200'} onChange={(e)=>setComment(e.target.value)} value={comment} />
            <div className='flex justify-between items-center mt-5  '>
              <p className='text-gray-500 text-xs'>
                {200-comment.length} characters are left
              </p>
              <Button outline gradientDuoTone={'purpleToBlue'} type='submit' >Sumbit</Button>
            </div>
          </form>
        )
      }
      {
        commentfromdb.length ===0 ? ("no comment yet"):(
          <>
          <div>           
             <p className='text-sm uppercase '>comments : {commentfromdb.length}</p>            
          </div>
         {
           commentfromdb.map(comm =>(
            <Commentscom key={comm._id} comm={comm} onLike={handlelikes} />
           ))
         }
          
          </>
        )
      }
      
      </div>
  )
}

export default Comment