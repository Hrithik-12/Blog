import {Avatar, Button, Dropdown, Modal, Navbar, TextInput} from 'flowbite-react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";
import {useDispatch, useSelector} from 'react-redux'
import { toggleTheme } from '../theme/darkmodeslice';
import { GoSun } from "react-icons/go";
import { signOutSuccess,signOutStart, signOutFailure } from '../Redux/UserSlice';
import { useState } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";
function Header() {
  const path=useLocation().pathname;
  const dispatch=useDispatch();
  const {theme}=useSelector(state=>state.theme)
  const {currentUser}=useSelector((state)=>state.user);
  const[isSignOutModal,setIsSignOutModal]=useState(false)
  const navigate=useNavigate()



  const handlesignout=async()=>{
    try{
      dispatch(signOutStart())
      const res=await fetch('/auth/useraction/signout',{
        method:"POST"
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(signOutFailure(data.message));
        setIsSignOutModal(false)
      }else{
        dispatch(signOutSuccess(data))
        setIsSignOutModal(false);
        navigate('/signin')
      }
    }catch(error){
      console.log(error)
    }
  }


  return (
    <Navbar className='border-b-2' >
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white ' >
      <span className=' px-2 py-1 bg-cyan-400 rounded-full  border-solid border-zinc-800 text-center ' >My Blog</span>
      </Link>

      <form >
       <TextInput id='search' placeholder='Search' type='text' rightIcon={FiSearch} className='hidden lg:inline ' />
      </form>

      <Button className='w-12 h-10 lg:hidden ' color="gray" pill  ><FiSearch  /></Button>
      <Navbar.Collapse>
        <Navbar.Link active={path ==='/'} as={'div'} ><Link to='/' >Home</Link></Navbar.Link>
        <Navbar.Link active={path ==='/about'} as={'div'}><Link to='/about' >About</Link></Navbar.Link>
        <Navbar.Link active={path ==='/contact'} as={'div'}><Link to='/contact' >Contact</Link></Navbar.Link>
        <Navbar.Link active={path ==='/project'} as={'div'}><Link to='/project' >Project</Link></Navbar.Link>

      </Navbar.Collapse>
      {/* // for dark theme toggle feature */}
      <div className='flex gap-2'>
        <Button className='w-12 h-10 hidden sm:inline outline-none ' color='gray' pill onClick={()=>dispatch(toggleTheme())}  >
         {theme==='light' ?  <MdOutlineDarkMode/>:<GoSun/>}
        </Button>
        {
          currentUser ?(<Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.image} rounded />} >
            <Dropdown.Header><span className='text-sm text-cyan-600 font-semibold'>@{currentUser.name}</span></Dropdown.Header>
            <Dropdown.Header><span className='text-sm text-cyan-600 font-semibold truncate '>{currentUser.email}</span></Dropdown.Header>
            <Link to='/dashboard?tab=profile' >
            <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
            <Dropdown.Item onClick={()=>setIsSignOutModal(true)} >Sign Out</Dropdown.Item>
          </Dropdown>) :(<Link to='/signin' ><Button gradientDuoTone='purpleToBlue' outline >Get Started</Button></Link>)
        }

        
        <Navbar.Toggle/>
        <Modal show={isSignOutModal} size="md" onClose={() => setIsSignOutModal(false)} popup>
        <Modal.Header/>
        <Modal.Body>
              <div className='text-center'>
                <IoMdInformationCircleOutline className='w-14 h-14 text-cyan-500 dark:text-cyan-200 mb-4 mx-auto '/>
                <h2 className='mb-5 text-lg font-serif  text-cyan-700 dark:text-cyan-300 '>Are You Sure You Want To Sign Out from your Account !!</h2>
                <div className='flex  justify-between items-center'>
                  <Button color='failure' onClick={handlesignout} >yes,I am sure</Button>
                  <Button  onClick={()=>setIsSignOutModal(false)} color='blue' > Cancel</Button>
                </div>

                

              </div>
          </Modal.Body>
       </Modal>
      </div>

      

    </Navbar>
  )
}

export default Header