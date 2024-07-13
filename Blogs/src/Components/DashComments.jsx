import { Table,Button } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { Modal } from 'flowbite-react';
import { IoMdInformationCircleOutline } from "react-icons/io";



function DashComment() {
  // let fetch the post accoring to which user made that post
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showmoreuser,setshowmoreuser]=useState(null);
  const[showmodel,setShoeModel]=useState(false);
  const[commentidtodelete,setcommentidtodelete]=useState('')
  



  useEffect(() => {
    const fetccomments = async () => {
      try {
        const res = await fetch(`/auth/comment/getcomments`);
        const data = await res.json();
        console.log(data)
        if (res.ok) {
          setComments(data.comm);
          if(data.comments.length <9){
            setshowmoreuser(false);
           
          }
          
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetccomments();
    }
  }, [currentUser._id]);

  const handelshowmore=async ()=>{
    const startindex=comments.length;
    try{
      const res = await fetch(`/auth/comment/getcomments?startindex=${startindex}`);
      const data=await res.json();
      if(res.ok){
        setComments((prev)=>[...prev,...data.comm]);
        if(data.users.length < 9){
          setshowmoreuser(false);
          
        }
      }

    }catch (error) {
        console.log(error.message);
      }
  }


  const handledeletecomments=async ()=>{
    setShoeModel(false);
    try{
     
      const res=await fetch(`/auth/comment/delete/${commentidtodelete}`,{
        method:"DELETE",
       
      });
      const data=await res.json();
     if(!res.ok){
      console.log(data.message)
     }else{
      setComments((prev)=>prev.filter((user)=>user._id !==commentidtodelete))
     }
    }catch(error){
      console.log(error);
    
    }
  
  }



  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-700 ">
      {
        currentUser.isAdmin && comments.length >0 ? (<>

        <Table hoverable className="shadow-md" >
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>comments</Table.HeadCell>
            <Table.HeadCell>Number of Likes</Table.HeadCell>
            <Table.HeadCell>PostId</Table.HeadCell>
            <Table.HeadCell>UserId</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
           
          </Table.Head>
          {
            comments.map((cuser,ind)=>(
              <Table.Body  key={ind} className='divide-y-2' >
                <Table.Row   className="bg-white dark:border-gray-800 dark:bg-gray-700" >
                  <Table.Cell>{ new Date(cuser.createdAt).toLocaleDateString() }</Table.Cell>
                  <Table.Cell   >                  
                    {cuser.content}
                  </Table.Cell>
                   <Table.Cell  >{cuser.numberofLikes}</Table.Cell>
                   <Table.Cell>{cuser.postId}</Table.Cell>
                   <Table.Cell>{cuser.userId}</Table.Cell>
                
                 <Table.Cell>
                  <span onClick={()=>{
                    setShoeModel(true);
                    setcommentidtodelete(cuser._id)
                    

                  }} className="text-red-500 font-medium hover:underline cursor-pointer ">Delete</span>
                 </Table.Cell>
                
                </Table.Row>

              </Table.Body>
            ))
          }


        </Table>
        {
          showmoreuser && (
            <button onClick={handelshowmore}  className="w-full text-teal-500 self-center text-sm py-2 border-[0.1rem] border-solid border-teal-700 " >Show More</button>
          )
        }
       
        
        
        
        </>):(<p>No comments Yet</p>)
      }
      <Modal show={showmodel} size="md" onClose={() => setShoeModel(false)} popup>
        <Modal.Header/>
        <Modal.Body>
              <div className='text-center'>
                <IoMdInformationCircleOutline className='w-14 h-14 text-cyan-500 dark:text-cyan-200 mb-4 mx-auto '/>
                <h2 className='mb-5 text-lg font-serif  text-cyan-700 dark:text-cyan-300 '>Are You Sure You Want To Delete this comment !!</h2>
                <div className='flex  justify-between items-center'>
                  <Button color='failure' onClick={handledeletecomments} >yes,I am sure</Button>
                  <Button onClick={()=>setShoeModel(false)} color='blue' >No, Cancel</Button>
                </div>

                

              </div>
          </Modal.Body>
       </Modal>
    </div>
  )
}

export default DashComment