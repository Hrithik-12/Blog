import {useDispatch, useSelector} from 'react-redux' 
import {Alert, Button, TextInput} from 'flowbite-react'
import { useEffect,useState,useRef } from 'react';
import {ref,getStorage, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { deleteUserstart, deleteUserSuccess, deletUserFailure, signOutFailure, signOutStart, signOutSuccess, updateFailure, updateStart, updateSuccess } from '../Redux/UserSlice';
import { Modal } from 'flowbite-react';
import { IoMdInformationCircleOutline } from "react-icons/io";




function DashboardProfile() {
  // show modal
  const[modal,setModal]=useState(false);
  // show modal
  const {currentUser,error}=useSelector(state=>state.user);
  const[imguplodinggg,setimguploadinggg]=useState(false);
  const[isUpdated,setIsUpdated]=useState(null);
  const[isupdatederror,setIsupdatederror]=useState(null);
  // a piece of state to hold the chosen image and a ref hook to trigger it
  const dispatch=useDispatch()
  const[formdata,setFormData]=useState({})
  const[imgfile,setimgFile]=useState(undefined);
  const [imageurl,setImageUrl]=useState(null);
  const[imgprogre,setImageProgress]=useState(0)
  const[imgerror,setImageerror]=useState(null)
  const fileref=useRef(null);
  console.log(imgprogre,imgerror);
  const[issignoutmodal,setIsSignOutModel]=useState(false)

  const handelimagechange=(e)=>{
    const fileuploaded=e.target.files[0];
     
// creating url for the selected image
    if(fileuploaded){
      setimgFile(fileuploaded);
      setImageUrl(URL.createObjectURL(fileuploaded))
    }
  }

  useEffect(()=>{
   if(imgfile) uploadimage(imgfile);
  },[imgfile])

  const uploadimage=(imgfile)=>{
    setimguploadinggg(true)
    const storage=getStorage(app);
    const fileName=imgfile.name + new Date().getTime();
    const storgaeRef=ref(storage,fileName);
    setImageerror(null)
    const uploadtask=uploadBytesResumable(storgaeRef,imgfile);
    uploadtask.on(
      'state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        // or we can use progress.toFixed(0)
        setImageProgress(Math.round(progress));
        
      },
      (error)=>{
        setImageerror("Image Should not be Exceed Than 2 Mb");
        setImageProgress(null);
        setimgFile(null);
        setImageUrl(null);
        setimguploadinggg(false)
        console.log(error)
      },
      ()=>{
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL)=>{
          setImageUrl(downloadURL);
         setImageProgress(null);
         setFormData({...formdata,image:downloadURL});
         setimguploadinggg(false)
        })

      }
    )
  }


  // connecting to api -----> update

  const handlechange=(e)=>{
    setFormData({...formdata,[e.target.id]:e.target.value})
  }

  const handlesubmit=async(e)=>{
    e.preventDefault();
    if(Object.keys(formdata).length===0){
      setIsupdatederror('No changes made')
      return;
    }
    if(imguplodinggg){
      setIsupdatederror("Please wait for Image to Upload")
      return
    }

    try{
      dispatch(updateStart());
      const res=await fetch( `/auth/useraction/update/${currentUser._id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formdata)
      });

      const data=await res.json();

      if(data.success===false){
        dispatch(updateFailure(data.message))
      }
      else{
        dispatch(updateSuccess(data));
        setIsUpdated("Your Profile Updated Successfully!!😎😎");
        setIsupdatederror(null)
      }

    }catch(error){
      dispatch(updateFailure(error));
      console.log(error);
    }
  }


const handleDeleteuser=async()=>{
  setModal(false);
  try{
    dispatch(deleteUserstart());
    const res=await fetch(`/auth/useraction/delete/${currentUser._id}`,{
      method:"DELETE",
     
    });
    const data=await res.json();
    if(data.success===false){
      dispatch(deletUserFailure(data.message))
    }
    else{
      dispatch(deleteUserSuccess(data));
    }


  }catch(error){
    console.log(error);
    dispatch(deletUserFailure(error))
  }

}

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
    <div className='w-full max-w-lg mx-auto p-3 '>
      <h1 className='text-center text-3xl text-cyan-500 font-serif my-7  '>Profile</h1>
      <form className='flex flex-col space-y-5 ' onSubmit={handlesubmit} >
      <input type="file" accept='image/*' ref={fileref} hidden onChange={handelimagechange} />
      <div className='relative self-center  w-32 h-32 rounded-full overflow-hidden cursor-pointer  '>
     
        <img src={imageurl || currentUser.image} alt="user"  className={`object-cover rounded-full w-full h-full border-[0.3rem]  border-solid border-cyan-400 ${imgprogre && imgprogre<100 && 'opacity-60' } `} onClick={()=>fileref.current.click()} />
        {imgprogre && <CircularProgressbar value={imgprogre || 0 } text={`${imgprogre}%`} strokeWidth={5} styles={
          {
            root:{
              width:'100%',
              height:'100%',
              position:'absolute',
              top:0,
              left:0

            },
            path:{
              stroke:`rgba(62,152,99,${imgprogre/100})`
            }
          }
        } />

        }
      </div>
      {
        imgerror && <Alert color='failure' >{imgerror}</Alert>
      }
      <TextInput type='text' id='name' defaultValue={currentUser.name} onChange={handlechange}   />
      <TextInput type='email' id='email' defaultValue={currentUser.email} onChange={handlechange}  />
      <TextInput type='text' id='password' placeholder='Password To Update' onChange={handlechange} />
      <Button type='submit' gradientDuoTone='purpleToBlue'  outline>Update Profile</Button>
      </form>
      <div className='flex justify-between items-center mt-2 '>
        <span className='text-sm font-semibold text-red-600 font-serif  cursor-pointer' onClick={()=>setModal(true)}  >Delete Account</span>
        <span className='text-sm font-semibold text-red-600 font-serif cursor-pointer ' onClick={()=>setIsSignOutModel(true)} >Sign out</span>
      </div>
      {
        isUpdated && <Alert color='success' className='mt-5' >{isUpdated}</Alert>
      }
      {
        isupdatederror && <Alert color='failure' className='mt-5' >{isupdatederror}</Alert>
      }
       <Modal show={modal} size="md" onClose={() => setModal(false)} popup>
        <Modal.Header/>
        <Modal.Body>
              <div className='text-center'>
                <IoMdInformationCircleOutline className='w-14 h-14 text-cyan-500 dark:text-cyan-200 mb-4 mx-auto '/>
                <h2 className='mb-5 text-lg font-serif  text-cyan-700 dark:text-cyan-300 '>Are You Sure You Want To Delete your Account !!</h2>
                <div className='flex  justify-between items-center'>
                  <Button color='failure' onClick={handleDeleteuser} >yes,I am sure</Button>
                  <Button  onClick={()=>setModal(false)} color='blue' >No, Cancel</Button>
                </div>

                

              </div>
          </Modal.Body>
       </Modal>
       <Modal show={issignoutmodal} size="md" onClose={() => setIsSignOutModel(false)} popup>
        <Modal.Header/>
        <Modal.Body>
              <div className='text-center'>
                <IoMdInformationCircleOutline className='w-14 h-14 text-cyan-500 dark:text-cyan-200 mb-4 mx-auto '/>
                <h2 className='mb-5 text-lg font-serif  text-cyan-700 dark:text-cyan-300 '>Are You Sure You Want To Sign Out from your Account !!</h2>
                <div className='flex  justify-between items-center'>
                  <Button color='failure' onClick={handlesignout} >yes</Button>
                  <Button  onClick={()=>setIsSignOutModel(false)} color='blue' >No</Button>
                </div>

                

              </div>
          </Modal.Body>
       </Modal>
       {
        error && <Alert color='failure' className='mt-5' >{error}</Alert>
      }
    </div>
  )
}

export default DashboardProfile