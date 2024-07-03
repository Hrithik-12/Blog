import {Sidebar} from 'flowbite-react'
import { useEffect, useState } from 'react';
import { CiUser } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa"
import { Link, useLocation } from 'react-router-dom';

function DashboardSidebar() {
  const location=useLocation();
  const [tabs,setTab]=useState('');

  useEffect(()=>{
    const urlparams=new URLSearchParams(location.search);
    const tabfromurl=urlparams.get('tab');
    if(tabfromurl) setTab(tabfromurl)
  },[location.search])
  return (
    <Sidebar className='w-full md:56 '>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={'/dashboard?tab=profile'}  ><Sidebar.Item as={'div'} icon={CiUser} active={tabs==='profile'}  label={'user'} labelColor='dark' >Profile</Sidebar.Item></Link>
          <Sidebar.Item  icon={FaArrowRight}  className='cursor-pointer' >Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>

    </Sidebar>
  )
}

export default DashboardSidebar