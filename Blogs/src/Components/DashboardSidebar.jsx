import {Sidebar} from 'flowbite-react'
import { useEffect, useState } from 'react';
import { CiUser } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signOutFailure, signOutSuccess,signOutStart } from '../Redux/UserSlice';
import { MdOutlinePostAdd } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";

function DashboardSidebar() {
  const location=useLocation();
  const [tabs,setTab]=useState('');
  const dispatch=useDispatch();
  const {currentUser} =useSelector((state=>state.user))

  useEffect(()=>{
    const urlparams=new URLSearchParams(location.search);
    const tabfromurl=urlparams.get('tab');
    if(tabfromurl) setTab(tabfromurl)
  },[location.search]);

  const handlesignout=async()=>{
    try{
      dispatch(signOutStart())
      const res=await fetch('/auth/useraction/signout',{
        method:"POST"
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(signOutFailure(data.message))
      }else{
        dispatch(signOutSuccess(data))
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <Sidebar className='w-full md:56 '>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex gap-2 flex-col' >
          <Link to={'/dashboard?tab=profile'}  ><Sidebar.Item as={'div'} icon={CiUser} active={tabs==='profile'}  label={ currentUser.isAdmin ? "Admin":"user" } labelColor='dark' >Profile</Sidebar.Item></Link>
          <Sidebar.Item  icon={FaArrowRight}  className='cursor-pointer' onClick={handlesignout} >Sign Out</Sidebar.Item>
          {
            currentUser.isAdmin && <Link to={'/dashboard?tab=post'} >
            <Sidebar.Item as={'div'}  icon={MdOutlinePostAdd}  className='cursor-pointer' active={tabs==='post'}  >Posts</Sidebar.Item>
            </Link>
          }
           {
            currentUser.isAdmin && <Link to={'/dashboard?tab=users'} >
            <Sidebar.Item as={'div'}  icon={HiOutlineUsers}  className='cursor-pointer' active={tabs==='users'}  >Users</Sidebar.Item>
            </Link>
          }

        </Sidebar.ItemGroup>
      </Sidebar.Items>

    </Sidebar>
  )
}

export default DashboardSidebar