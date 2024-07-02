import { Link, useNavigate } from 'react-router-dom'
import signupimage from '../images/Mobile login-pana.svg'
import {Alert, Button, Label, TextInput} from 'flowbite-react'
import {TypeAnimation} from 'react-type-animation'
import { useState } from 'react'
import { Spinner } from 'flowbite-react'
import OAuth from '../Components/OAuth'

function Signup() {
  const[formdata,setformdata]=useState({});
  const [loading,setloading]=useState(false);
  const[error,seterror]=useState(null);
  const navigate=useNavigate();


  const handlechange=(event)=>{
    setformdata({...formdata,[event.target.id]:event.target.value})
  }

  const handlesubmit=async (e)=>{
    e.preventDefault();
    try{
      setloading(true)
      const res=await fetch('/auth/user/signup',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formdata)
      });
      const data=await res.json();
      if(data.success===false){
        setloading(false);
        seterror(data.message);
      }
      else{
        setloading(false);
        seterror(null);
        navigate('/')
      }
      
    }catch(error){
      setloading(false);
      seterror(error.message);
      console.log(error)
  }
  }
  


  return (
    <div className='w-full min-h-screen mt-4 flex items-center p-4 justify-center gap-6 '>
<div className='logo w-[40%] h-fit  '>
    
  <img src={signupimage} alt="signup" className=' w-full object-cover  ' />
   
</div>

<div className='form w-[40%] flex flex-col justify-center space-y-8  '>
  {/* <h1 className='text-xl font-serif font-semibold  text-center mb-8' >Sign Up for Better Features...</h1> */}
    <div className='font-semibold text-cyan-900 text-center whitespace-nowrap  '>
    <TypeAnimation 
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Welcome!! 😄😄',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Lets Sign Up Quickly👋👋',
        1000,
        'This is My personal Blog Project😍😍',
        1000
        
      ]}
      wrapper="span"
      speed={30}
      style={{ fontSize: '1.5rem', display: 'inline-block' }}
      repeat={Infinity}
    />
    </div>
  <form className='flex flex-col space-y-7' onSubmit={handlesubmit} >
    <div className='flex flex-col gap-4'>
      <Label value='Your Name'  />
      <TextInput placeholder='Enter UserName' id='name' type='text' onChange={handlechange}  />
    </div>
    <div className='flex flex-col gap-4'>
      <Label value='Your Email' />
      <TextInput placeholder='Enter Email' id='email' type='email' onChange={handlechange}  />
    </div>
    <div className='flex flex-col gap-4'>
      <Label value='Your Password' />
      <TextInput placeholder='Create Password' id='password' type='password' onChange={handlechange}   />
    </div>
    <Button disabled={loading}  gradientDuoTone="cyanToBlue" type='submit'  >{loading ? (<Spinner aria-label="Large spinner example" size="lg" />):"Sign Up" }</Button>
    <OAuth/>
  </form>
  <div className='flex gap-2 items-center '>
    <span className='text-sm  font-semibold'>Have An Account?</span>
    <span className='text-cyan-900 font-semibold underline'><Link to='/signin' >Sign in</Link></span>
  </div>
  {
        // error && <p className='text-sm mt-0 text-red-800 font-semibold   '>{error}</p>
        error && <Alert className='text-red-800 font-semibold '>{error}</Alert>
      }
  
     

</div>

</div>

  
  )
}

export default Signup