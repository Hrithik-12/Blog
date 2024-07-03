import {useSelector} from 'react-redux' 
import {Alert, Button, TextInput} from 'flowbite-react'
import { useEffect,useState,useRef } from 'react';
import {ref,getStorage, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';




function DashboardProfile() {
  const {currentUser}=useSelector(state=>state.user);
  // a piece of state to hold the chosen image and a ref hook to trigger it
  const[imgfile,setimgFile]=useState(undefined);
  const [imageurl,setImageUrl]=useState(null);
  const[imgprogre,setImageProgress]=useState(0)
  const[imgerror,setImageerror]=useState(null)
  const fileref=useRef(null);
  console.log(imgprogre,imgerror)

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
        setImageUrl(null)
        console.log(error)
      },
      ()=>{
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL)=>{
          setImageUrl(downloadURL);
         setImageProgress(null);
        })

      }
    )
  }


  












  return (
    <div className='w-full max-w-lg mx-auto p-3 '>
      <h1 className='text-center text-3xl text-cyan-500 font-serif my-7  '>Profile</h1>
      <form className='flex flex-col space-y-5 ' >
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
      <TextInput type='text' id='name' defaultValue={currentUser.name}  />
      <TextInput type='email' id='email' defaultValue={currentUser.email}  />
      <TextInput type='text' id='password' placeholder='Password To Update' />
      <Button type='submit' gradientDuoTone='purpleToBlue'  outline>Update Profile</Button>
      </form>
      <div className='flex justify-between items-center mt-2 '>
        <span className='text-sm font-semibold text-red-600 font-serif  cursor-pointer'>Delete Account</span>
        <span className='text-sm font-semibold text-red-600 font-serif cursor-pointer '>Sign out</span>
      </div>
    </div>
  )
}

export default DashboardProfile