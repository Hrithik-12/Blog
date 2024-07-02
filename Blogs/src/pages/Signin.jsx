import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import Login from '../images/My password-pana.svg'
import { TypeAnimation } from "react-type-animation";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../Redux/UserSlice";
import OAuth from "../Components/OAuth";
// redux persist use for to store the data after refreshing

function Signin() {
  const[formvalue,setFormvalue]=useState({});
  // const[loading,setLoading]=useState(false);
  // const[error,setError]=useState(null);
  const {loading,error}=useSelector((state)=>state.user)
  const navigate=useNavigate();
  const dispatch=useDispatch()

  const handlechange=(e)=>{
    setFormvalue({...formvalue,[e.target.id]:e.target.value})
  }
  
  const handlesubmit=async (e)=>{
    e.preventDefault();
   try{
  //  setLoading(true)
  dispatch(signInStart())
    const res=await fetch('/auth/user/signin',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formvalue)
    });

    const data=await res.json();
    if(data.success===false){
      // setLoading(false);
      // setError(data.message)
      dispatch(signInFailure(data.message))
    }
    else{
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data))
      navigate('/')
      console.log(data);
    }
    
   }catch(error){
    // setLoading(false);
    // setError(error);
    dispatch(signInFailure(error));
    console.log(error);
   }
  }
  return (
    <div className="w-full min-h-screen mt-4 p-4 flex items-center  ">

      <div className="form w-[50%] flex flex-col items-center ">
      <TypeAnimation className="text-xl text-cyan-600 font-semibold font-serif mb-9 text-center  "
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Welcome Again!! 😄😄',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        ' Sign In👋👋',
        1000,
       
        
        
      ]}
      wrapper="span"
      speed={30}
      style={{ fontSize: '1.5rem', display: 'inline-block' }}
      repeat={Infinity}
    />
        <form className="w-[70%] h-full flex flex-col space-y-6 " onSubmit={handlesubmit}>
          <div className="flex flex-col space-y-5 ">
            <Label value="Email" />
            <TextInput type="email" id="email" placeholder="Enter Registered Email" onChange={handlechange} />
          </div>
          <div className="flex flex-col space-y-5 ">
            <Label value="Password" />
            <TextInput type="password" id="password" placeholder="Enter Password" onChange={handlechange} />
          </div>
          <Button gradientDuoTone="cyanToBlue" type="submit" disabled={loading} >{loading ? (<Spinner aria-label="Large spinner example" size="lg"/>):"Sign in"}</Button>
          <OAuth/>

        </form>
        <div>
          <span className="text-sm font-bold text-cyan-800">Dont Have An Account ?<Link to='/signup' className="text-cyan-400 underline ml-2">Sign up</Link></span>
        </div>
        {
          error && <Alert className="text-sm text-red-600 font-semibold mt-8 bg-cyan-200 ">{error}</Alert>
        }

      </div>
      <div className="logo-image w-[60%] flex items-center justify-center ">
        <img src={Login} alt="Login" className="w-[70%] h-fit" />
        
      </div>


    </div>
  )
}

export default Signin