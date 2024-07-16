import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { FaRegUser } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaRegComments } from "react-icons/fa6";
import {Button, Table} from 'flowbite-react'
import {Link} from 'react-router-dom'

function MainDashboard() {
  const[user,setuser]=useState([]);
  const[comments,setcomments]=useState([]);
  const[posts,setposts]=useState([]);
  const[totaluser,settotaluser]=useState(0);
  const[totalcomm,setTotalcomments]=useState(0)
  const[totalposts,setTotalposts]=useState(0);
  const[lastmonthpost,setlastmonthpost]=useState(0)
  const[lastmonthuser,setlastmonthuser]=useState(0)
  const[lastmonthcomm,setlastmonthcomm]=useState(0)
  const {currentUser}=useSelector(state=>state.user)

  useEffect(()=>{
    const fetchuser=async ()=>{
      try {
        const res = await fetch(`/auth/useraction/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setuser(data.users);
          settotaluser(data.totalusers)
          setlastmonthuser(data.lastmonthuser)

        }
      } catch (error) {
        console.log(error.message);
      }

    }

    const fetchposts=async ()=>{
      try {
        const res = await fetch(`/auth/posts/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setposts(data.posts);
          setTotalposts(data.totalpost)
          setlastmonthpost(data.lastmonthpost)
         
          
        }
      } catch (error) {
        console.log(error.message);
      }

    }

    const fetchcomm=async ()=>{
      try {
        const res = await fetch(`/auth/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setcomments(data.comm);
          setTotalcomments(data.totalcomm);
          setlastmonthcomm(data.lastmonthcomm)
          
          
        }
      } catch (error) {
        console.log(error.message);
      }

    }
    if(currentUser.isAdmin){
      fetchuser();
      fetchposts();
      fetchcomm()
    }

    

  },[currentUser])










  return (
   <div className='p-3 md:mx-auto  '>
   <div className=' p-3 md:mx-auto flex h-fit flex-wrap gap-4 justify-center '>
   <div className='flex flex-col p-3 dark:bg-slate-700 gap-4 md:w-72 w-full rounded-md shadow-lg '>
      <div className=' flex justify-between '>
        <div >
          <h3 className='uppercase text-gray-500 text-md  '>Total Users</h3>
          <p className='text-2xl'>{totaluser}</p>
         


        </div>
        <FaRegUser className='bg-teal-400 text-white rounded-full text-5xl p-3 shadow-lg '/>
       
      </div>
      <div className='flex gap-2 text-sm' >
          <span className='text-green-500 flex gap-2 items-center '> <FaArrowUp/>{lastmonthuser}</span>
          <div className='text-gray-500  '>Last Month</div>
        </div>
    </div>
    <div className='flex flex-col p-3 dark:bg-slate-700 gap-4 md:w-72 w-full rounded-md shadow-lg '>
      <div className=' flex justify-between '>
        <div >
          <h3 className='uppercase text-gray-500 text-md  '>Total Posts</h3>
          <p className='text-2xl'>{totalposts}</p>
         


        </div>
        <MdOutlinePostAdd className='bg-teal-400 text-white rounded-full text-5xl p-3 shadow-lg '/>
       
      </div>
      <div className='flex gap-2 text-sm' >
          <span className='text-green-500 flex gap-2 items-center '> <FaArrowUp/>{lastmonthpost}</span>
          <div className='text-gray-500  '>Last Month</div>
        </div>
    </div>
    <div className='flex flex-col p-3 dark:bg-slate-700 gap-4 md:w-72 w-full rounded-md shadow-lg '>
      <div className=' flex justify-between '>
        <div >
          <h3 className='uppercase text-gray-500 text-md  '>Total Comments</h3>
          <p className='text-2xl'>{totalcomm}</p>
         


        </div>
        <FaRegComments className='bg-teal-400 text-white rounded-full text-5xl p-3 shadow-lg '/>
       
      </div>
      <div className='flex gap-2 text-sm' >
          <span className='text-green-500 flex gap-2 items-center '> <FaArrowUp/>{lastmonthcomm}</span>
          <div className='text-gray-500  '>Last Month</div>
        </div>
    </div>
   </div>
   <div className='flex flex-wrap gap-4 mx-auto justify-center py-3'>
    <div className='flex flex-col w-full md:w-auto shadow-md rounded-md p-2 dark:bg-zinc-800'>
      <div className='flex justify-between p-3 items-center text-sm font-semibold '>
        <h1 className='text-center p-2'>Recent users</h1>
        <Button><Link to={'/dashboard?tab=users'} >View all</Link></Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>User image</Table.HeadCell>
          <Table.HeadCell>User Name</Table.HeadCell>
        </Table.Head>
        {
          user && user.map((i)=>(
            <Table.Body key={i._id} className='divide-y'>
              <Table.Row>
                <Table.Cell>
                  <img src={i.image} alt="user" className='w-10 h-10 rounded-full bg-gray-500 ' />
                </Table.Cell>
                <Table.Cell>{i.name}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))
        }

      </Table>
    </div>
    <div className='flex flex-col w-full md:w-auto shadow-md rounded-md p-2 dark:bg-zinc-800'>
      <div className='flex justify-between p-3 items-center text-sm font-semibold '>
        <h1 className='text-center p-2'>Recent comments</h1>
        <Button><Link to={'/dashboard?tab=comments'} >View all</Link></Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>comment </Table.HeadCell>
          <Table.HeadCell>Comments</Table.HeadCell>
        </Table.Head>
        {
          comments && comments.map((i)=>(
            <Table.Body key={i._id} className='divide-y'>
              <Table.Row>
                <Table.Cell>
                  {new Date(i.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{i.content}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))
        }

      </Table>
    </div>
    <div className='flex flex-col w-full md:w-auto shadow-md rounded-md p-2 dark:bg-zinc-800'>
      <div className='flex justify-between p-3 items-center text-sm font-semibold '>
        <h1 className='text-center p-2'>Recent posts</h1>
        <Button><Link to={'/dashboard?tab=post'} >View all</Link></Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>post</Table.HeadCell>
          <Table.HeadCell>title</Table.HeadCell>
          <Table.HeadCell>Post Image</Table.HeadCell>
        </Table.Head>
        {
          posts && posts.map((i)=>(
            <Table.Body key={i._id} className='divide-y'>
              <Table.Row>
                <Table.Cell>
                  {new Date(i.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{i.title}</Table.Cell>
                <Table.Cell><img src={i.image}  className='w-10 h-10 rounded-md object-cover'/></Table.Cell>
              </Table.Row>
            </Table.Body>
          ))
        }

      </Table>
    </div>
   </div>
 
    
   </div>
  )
}

export default MainDashboard