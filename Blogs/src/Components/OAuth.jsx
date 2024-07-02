import {Button} from 'flowbite-react'
import { FaGoogle } from "react-icons/fa";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux'
import {signInFailure,signInSuccess} from '../Redux/UserSlice'
import {useNavigate} from 'react-router-dom'

function OAuth() {
  const auth=getAuth(app);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const handlegoogleclick=async ()=>{
    
    const provider=new GoogleAuthProvider();
    // custom params always allow to select an account
    provider.setCustomParameters({prompt:'select_account'})
    try{
      
      const result=await signInWithPopup(auth,provider)
      // send the detail to backedn in order to register the user
      const res=await fetch('/auth/user/google',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          image:result.user.photoURL
        })
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(signInFailure(data.message))

      }
      else{
        dispatch(signInSuccess(data));
        navigate('/')
      }
    }catch(error){
      console.log(error)
    }

  }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange'  outline onClick={handlegoogleclick} >
      <FaGoogle className='w-6 h-6 mr-4 ' />
      <span>Continue With Google</span>
    </Button>
  )
}

export default OAuth