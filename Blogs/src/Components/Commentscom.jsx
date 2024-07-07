import { useEffect, useState } from "react"
import moment from 'moment'


function Commentscom({comm}) {
  const [user,setUser]=useState({})
  useEffect(()=>{
    const getuser=async ()=>{
      try{
        const res=await fetch(`/auth/useraction/${comm.userId}`);
        const data=await res.json();
        if(res.ok){
          setUser(data)
        }


      }catch(error){
        console.log(error)
      }

     

    }
    getuser();
  })
  return (
    <div className="flex flex-col p-4 border-b-2 border-teal-400 gap-2">
      <div className="flex shrink-0 mr-3">
        <img src={user.image} className="w-5 h-5 object-cover rounded-full  " />
      </div>
      <div className="flex gap-1 items-center mb-1 ">
        <span className="font-bold mr-1 text-sm truncate ">{user ? `@${user.name}`: 'anonymous_user'}</span>
        <span className="text-xs text-gray-400 ">{moment(comm.createdAt).fromNow()}</span>
      </div>
      <p className="text-md text-gray-400">
        {comm.content}
      </p>
     


    </div>
  )
}

export default Commentscom
