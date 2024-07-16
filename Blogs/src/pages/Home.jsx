import {Link} from 'react-router-dom'
import CalltoAction from '../Components/CalltoAction'
import { useEffect, useState } from 'react'
import Postcard from '../Components/Postcard'

function Home() {
  const[post,setPost]=useState([]);

useEffect(()=>{
  const fetchposts=async ()=>{
    try {
      const res = await fetch(`/auth/posts/getposts`);
      const data = await res.json();
      if (res.ok) {
        setPost(data.posts);

        
      }
    } catch (error) {
      console.log(error.message);
    }

  }
  fetchposts()


},[])


  return (
    <div className='min-h-screen p-3 '>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
      <h1 className='uppercase text-4xl font-serif font-bold lg:text-6xl   '>Welcome to my blog application</h1>
      <p className='text-gray-500 text-xs sm:text-sm'>Here you will find all the post related to technical stuff. this blog application fall you love in reading articles</p>
      <Link to={'/search'} className='text-xs sm:text-sm text-teal-500 font-bold hover:underline' >View all posts</Link>
      </div>
      <div className='p-3 bg-amber-200 dark:bg-slate-700  '>
        <CalltoAction/>
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7 '>
        {
          post && post.length >0 && ( <div className='flex flex-col gap-6  '>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {
                post.map((post)=>(
                  <Postcard key={post._id} post={post} />
                ))
              }
            </div>
            <Link to={'/search'} className='text-teal-500 hover:underline font-bold' >View Post</Link>
          </div>)

        }

      </div>
      
    </div>
  )
}

export default Home