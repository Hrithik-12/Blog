
import { Button, Textarea} from 'flowbite-react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
function Comment({postId}) {
  const {currentUser}=useSelector(state=>state.user)
  const[comment,setComment]=useState('')
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
      }
      console.log(data)

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
      
      </div>
  )
}

export default Comment