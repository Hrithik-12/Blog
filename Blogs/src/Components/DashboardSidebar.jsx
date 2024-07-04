import {Sidebar} from 'flowbite-react'
import { useEffect, useState } from 'react';
import { CiUser } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa"
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signOutFailure, signOutSuccess,signOutStart } from '../Redux/UserSlice';

function DashboardSidebar() {
  const location=useLocation();
  const [tabs,setTab]=useState('');
  const dispatch=useDispatch()

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
        <Sidebar.ItemGroup>
          <Link to={'/dashboard?tab=profile'}  ><Sidebar.Item as={'div'} icon={CiUser} active={tabs==='profile'}  label={'user'} labelColor='dark' >Profile</Sidebar.Item></Link>
          <Sidebar.Item  icon={FaArrowRight}  className='cursor-pointer' onClick={handlesignout} >Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>

    </Sidebar>
  )
}

export default DashboardSidebar