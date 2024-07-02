import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react'
import { Link,useLocation } from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";
import {useSelector} from 'react-redux'
function Header() {
  const path=useLocation().pathname;
  const {currentUser}=useSelector((state)=>state.user)
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
        <Button className='w-12 h-10 hidden sm:inline ' color='gray' pill >
          <MdOutlineDarkMode/>
        </Button>
        {
          currentUser ?(<Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.image} rounded />} >
            <Dropdown.Header><span className='text-sm text-cyan-600 font-semibold'>@{currentUser.name}</span></Dropdown.Header>
            <Dropdown.Header><span className='text-sm text-cyan-600 font-semibold truncate '>{currentUser.email}</span></Dropdown.Header>
            <Link to='/dashboard?tab=profile' >
            <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown>) :(<Link to='/signin' ><Button gradientDuoTone='purpleToBlue' outline >Get Started</Button></Link>)
        }

        
        <Navbar.Toggle/>
      </div>

      

    </Navbar>
  )
}

export default Header