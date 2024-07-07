import { Table,Button } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { Modal } from 'flowbite-react';
import { IoMdInformationCircleOutline } from "react-icons/io";


function DashPosts() {
  // let fetch the post accoring to which user made that post
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showmorepost,setshowmorepost]=useState(true);
  const[showlesspost,setshowlesspost]=useState(false);
  const[showmodel,setShoeModel]=useState(false);
  const[postid,setpostid]=useState('')
  



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/auth/posts/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if(data.posts.length <9){
            setshowmorepost(false);
            setshowlesspost(false)
          }
          
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handelshowmore=async ()=>{
    const startindex=userPosts.length;
    try{
      const res = await fetch(`/auth/posts/getposts?userId=${currentUser._id}&startindex=${startindex}`);
      const data=await res.json();
      if(res.ok){
        setUserPosts((prev)=>[...prev,...data.posts]);
        if(data.posts.length < 9){
          setshowmorepost(false);
          
        }
      }

    }catch (error) {
        console.log(error.message);
      }
  }
  const handelshowlesspost=async ()=>{

    try{
      const res = await fetch(`/auth/posts/getposts?userId=${currentUser._id}`);
      const data=await res.json();
      if(res.ok){
        setUserPosts(data.posts);
        if(data.posts.length <=9){
          setshowmorepost(true);
          setshowlesspost(false);
        }
      }

     
    }catch(error){
      console.log(error);
    }
  }

  const handledeletepost=async ()=>{
    setShoeModel(false);
    try{
     
      const res=await fetch(`/auth/posts/delete/${postid}/${currentUser._id}`,{
        method:"DELETE",
       
      });
      const data=await res.json();
     if(!res.ok){
      console.log(data.message)
     }else{
      setUserPosts((prev)=>prev.filter((post)=>post._id !==postid))
     }
    }catch(error){
      console.log(error);
    
    }
  
  }



  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-700 ">
      {
        currentUser.isAdmin && userPosts.length >0 ? (<>

        <Table hoverable className="shadow-md" >
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell><span>Edit</span></Table.HeadCell>
          </Table.Head>
          {
            userPosts.map((posts,ind)=>(
              <Table.Body  key={ind} className='divide-y-2' >
                <Table.Row   className="bg-white dark:border-gray-800 dark:bg-gray-700" >
                  <Table.Cell>{ new Date(posts.updatedAt).toLocaleDateString() }</Table.Cell>
                  <Table.Cell   >
                    <Link as={'div'} to={`/post/${posts.slug}`} >
                    <img src={posts.image} alt={posts.title}  className="w-20 h-10 object-cover bg-gray-500 "/>
                    </Link>

                  </Table.Cell>
                   <Table.Cell  ><Link to={`/post/${posts._id}`} >{posts.title}</Link></Table.Cell>
                 <Table.Cell>{posts.category}</Table.Cell>
                 <Table.Cell>
                  <span onClick={()=>{
                    setShoeModel(true);
                    setpostid(posts._id);

                  }} className="text-red-500 font-medium hover:underline cursor-pointer ">Delete</span>
                 </Table.Cell>
                 <Table.Cell >
                  <Link to={`/update-post/${posts._id}`} ><span className="text-teal-400" >Edit</span></Link>
                 </Table.Cell>
                </Table.Row>

              </Table.Body>
            ))
          }


        </Table>
        {
          showmorepost && (
            <button onClick={handelshowmore} className="w-full text-teal-500 self-center text-sm py-2 border-[0.1rem] border-solid border-teal-700 " >Show More</button>
          )
        }
        {
          showlesspost && <button onClick={handelshowlesspost}  className="w-full text-teal-500 self-center text-sm py-2 border-[0.1rem] border-solid border-teal-700 " >Show less</button>
        }
        
        
        
        </>):(<p>No Post Yet</p>)
      }
      <Modal show={showmodel} size="md" onClose={() => setShoeModel(false)} popup>
        <Modal.Header/>
        <Modal.Body>
              <div className='text-center'>
                <IoMdInformationCircleOutline className='w-14 h-14 text-cyan-500 dark:text-cyan-200 mb-4 mx-auto '/>
                <h2 className='mb-5 text-lg font-serif  text-cyan-700 dark:text-cyan-300 '>Are You Sure You Want To Delete this post !!</h2>
                <div className='flex  justify-between items-center'>
                  <Button color='failure' onClick={handledeletepost} >yes,I am sure</Button>
                  <Button  color='blue' >No, Cancel</Button>
                </div>

                

              </div>
          </Modal.Body>
       </Modal>
    </div>
  )
}

export default DashPosts