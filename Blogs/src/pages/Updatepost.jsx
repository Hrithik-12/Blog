import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate,useParams} from 'react-router-dom'
import { useSelector } from 'react-redux';



export default function UpdatePost() {
  const {currentUser}=useSelector(state=>state.user)
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const[publisherror,setpublisherror]=useState(null);
  const navigate=useNavigate();
  const {postid} =useParams();

  useEffect(()=>{
    try{
      const fetchpostaccordingtopostid=async ()=>{
        const res=await fetch(`/auth/posts/getposts?postId=${postid}`);
        const data=await res.json();
        if(!res.ok){
          console.log(data.message);
          setpublisherror(data.message)
          return
        }
        else{
          setpublisherror(null)
          setFormData(data.posts[0])
        }
       
      }

      fetchpostaccordingtopostid()

    }catch(error){
      console.log(error)
    }
  },[postid])
 
 

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handlesubmit=async (e)=>{
    e.preventDefault();
    try{
      const res=await fetch(`/auth/posts/updatepost/${formData._id}/${currentUser._id}`,{
        method:"PUT",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      console.log(data)
      if(data.success===false){
        setpublisherror("Title Be Unique....");
        return

      }
      else{
        setpublisherror(null);
        navigate('/dashboard?tab=post')
        
       
      }
    }catch(error){
      setpublisherror("something went wrong");
      console.log(error);
    }
  }
 
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handlesubmit} >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            defaultValue={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-[90%] h-[60%] object-cover self-center'
          />
        )}
        <ReactQuill
          theme='snow'
          value={formData.content}
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
         
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Update This Post
        </Button>
        {
          publisherror && <Alert color='failure' >{publisherror}</Alert>
        }
       
      </form>
    </div>
  );
}
// after this add this section to dashboard sidebar for showing all post
