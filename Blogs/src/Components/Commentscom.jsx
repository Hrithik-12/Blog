import { useEffect, useState } from "react"
import moment from 'moment'
import { PiThumbsUpBold } from "react-icons/pi";
import { useSelector } from "react-redux";


function Commentscom({comm,onLike}) {
  const [user,setUser]=useState({});
  const {currentUser} =useSelector(state=>state.user)


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
  },[])
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
      <div className="flex items-center pt-2 text-xs border-t-2 dark:border-gray-700 max-w-fit gap-2 ">
        <button type="button" onClick={()=>onLike(comm._id)} className={`text-gray-400 hover:text-teal-500 ${currentUser && comm.likes.includes(currentUser._id)  && 'text-blue-500' }  `}>
          <PiThumbsUpBold className="text-sm  " />
        </button>
        <p className="text-gray-400">
          {
            comm.numberoflikes >0 && comm.numberoflikes + ' ' + (comm.numberoflikes===1 ? 'like':'likes' )
          }
        </p>
      </div>
     


    </div>
  )
}

export default Commentscom
