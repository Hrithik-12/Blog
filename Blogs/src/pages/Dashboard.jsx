// to know on which tab we are currently so we can use useLocation hook from react-router-dom 
// this is used to render diffrent components on dashboard
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import DashboardSidebar from '../Components/DashboardSidebar';
import DashboardProfile from '../Components/DashboardProfile';

function Dashboard() {
  const location=useLocation();
  const [tab,setTab]=useState('');
  useEffect(()=>{
    const urlparams=new URLSearchParams(location.search);
    const tabformurl=urlparams.get('tab');
    if(tabformurl) setTab(tabformurl)
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row '>
      <div className='md:w-56'>
        {/* // sidebar */} 
        <DashboardSidebar/>
      </div>
      <div>
      {
        tab==='profile' && <DashboardProfile/>
      }

      </div>
    </div>
  )
}

export default Dashboard