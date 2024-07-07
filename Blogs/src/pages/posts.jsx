import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import CalltoAction from "../Components/CalltoAction";
import Comment from "../Components/Comment";
// adding call to action post from components

function Posts() {
  const {postId} =useParams();
  const[loading,setloading]=useState(true);
  const[error,seterror]=useState(false);
  const[post,setpost]=useState(null)

  useEffect(()=>{
    console.log(postId);
    const fetchpost=async ()=>{
      try{
        setloading(true);
        const res=await fetch(`/auth/posts/getposts?postId=${postId}`);
        const data=await res.json();
        console.log(data.posts[0]);
        if(!res.ok){
          seterror(true);
          setloading(false);
          return;

        }
        else{
          setpost(data.posts[0]);
          setloading(false);
          seterror(null);
        }




      }catch(error){
        console.log(error);
        seterror(false);
        setloading(false);
      }
    }
    fetchpost()

  },[postId]);


  if(loading) return <div className="flex justify-center items-center min-h-screen "><Spinner size={'2xl'}  color={'blue'}/></div>
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen   " >
      <h1 className="text-3xl mt-10 p-3 text=center font-serif max-w-2xl mx-auto lg:text-5xl uppercase  ">{post && post.title }</h1>
      <Link to={`/search?category=${post && post.category}`} className="self-center mt-5" ><Button color={'gray'} pill size={'xs'} >{post && post.category}</Button></Link>
      <img src={post && post.image} alt="post title" className="mt-10 p-3 max-h-[600px] w-full object-cover " />
      <div className="flex items-center justify-between p-3 border-b-2 border-solid border-slate-500 text-xs ">
        <span>{post && new Date(post.createdAt).toLocaleDateString() }</span>
        <span className="italic">{post && (post.content.length /1000).toFixed(0)} mins read</span>
      </div>
      <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html:post && post.content}} >
        {/* // let design this body as we have html tags so now we are required to use pure classes and edit them in index.js */}

      </div>
      <div className="max-w-4xl mx-auto w-full ">
        <CalltoAction/>
      </div>
      <Comment postId={postId} />
    </main>
  )
}

export default Posts