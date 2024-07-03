import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


function Footers() {
  return (
   <Footer container className="border border-t-2 border-cyan-500" >
    <div className="w-full max-w-7xl mx-auto ">
     <div className="grid w-full justify-between sm:flex md:grid-cols-1">
     <div>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white ' >
      <span className=' px-2 py-1 bg-cyan-400 rounded-full  border-solid border-zinc-800 text-center text-2xl ' >My Blog</span>
      </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm: mt-4 sm:grid-cols-3 sm:gap-6 ">
        <div>
          <Footer.Title title="About" />
        <Footer.LinkGroup>
          <Footer.Link href="#" target="_blank" rel="noopener noreferrer" as={'div'} ><Link>Contact</Link></Footer.Link>
        </Footer.LinkGroup>
      
        <Footer.LinkGroup>
          <Footer.Link href="#" target="_blank" rel="noopener noreferrer" as={'div'}><Link>Reach us</Link></Footer.Link>
        </Footer.LinkGroup>
      
        <Footer.LinkGroup>
          <Footer.Link href="#" target="_blank" rel="noopener noreferrer" as={'div'} ><Link>Policy</Link></Footer.Link>
        </Footer.LinkGroup>
        
        
        </div>
        <div>
          <Footer.Title title="Follow Me" />
          <Footer.LinkGroup>
          <Footer.Link href="#" target="_blank" rel="noopener noreferrer" as={'div'} ><Link>Github</Link></Footer.Link>
        </Footer.LinkGroup>
        <Footer.LinkGroup>
          <Footer.Link href="#" target="_blank" rel="noopener noreferrer" as={'div'} ><Link>Instagram</Link></Footer.Link>
        </Footer.LinkGroup>
        <Footer.LinkGroup>
          <Footer.Link href="#" target="_blank" rel="noopener noreferrer" as={'div'}><Link>LinkedIn</Link></Footer.Link>
        </Footer.LinkGroup>
        </div>
        

        
      </div>
     </div>
     <Footer.Divider/>
      <div className="flex flex-col space-y-2">
        <Footer.Copyright href="#" by="Hrithik" year={new Date().getFullYear()} />
        <div className="flex items-center justify-between">
          <Footer.Icon href='#' icon={FaInstagram} />
          <Footer.Icon href="#" icon={FaLinkedin} />
          <Footer.Icon href="#" icon={FaGithub} />
        </div>
      </div>
     
    </div>


   </Footer>
  )
}

export default Footers