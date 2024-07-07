import { Table,Button } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { Modal } from 'flowbite-react';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";


function DashUser() {
  // let fetch the post accoring to which user made that post
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState([]);
  const [showmoreuser,setshowmoreuser]=useState(true);
  const[showmodel,setShoeModel]=useState(false);
  const[usersid,setusersid]=useState('')
  



  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await fetch(`/auth/useraction/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.users);
          if(data.users.length <9){
            setshowmoreuser(false);
           
          }
          
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchusers();
    }
  }, [currentUser._id]);

  const handelshowmore=async ()=>{
    const startindex=user.length;
    try{
      const res = await fetch(`/auth/useraction/getusers?startindex=${startindex}`);
      const data=await res.json();
      if(res.ok){
        setUser((prev)=>[...prev,...data.users]);
        if(data.users.length < 9){
          setshowmoreuser(false);
          
        }
      }

    }catch (error) {
        console.log(error.message);
      }
  }


  const handledeleteuser=async ()=>{
    setShoeModel(false);
    try{
     
      const res=await fetch(`/auth/useraction/delete/${usersid}`,{
        method:"DELETE",
       
      });
      const data=await res.json();
     if(!res.ok){
      console.log(data.message)
     }else{
      setUser((prev)=>prev.filter((user)=>user._id !==usersid))
     }
    }catch(error){
      console.log(error);
    
    }
  
  }



  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-700 ">
      {
        currentUser.isAdmin && user.length >0 ? (<>

        <Table hoverable className="shadow-md" >
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell><span>Edit</span></Table.HeadCell>
          </Table.Head>
          {
            user.map((cuser,ind)=>(
              <Table.Body  key={ind} className='divide-y-2' >
                <Table.Row   className="bg-white dark:border-gray-800 dark:bg-gray-700" >
                  <Table.Cell>{ new Date(cuser.createdAt).toLocaleDateString() }</Table.Cell>
                  <Table.Cell   >                  
                    <img src={cuser.image} alt={cuser.name}  className="w-10 h-10 object-cover rounded-full bg-gray-500 "/>
                  </Table.Cell>
                   <Table.Cell  >{cuser.name}</Table.Cell>
                   <Table.Cell>{cuser.email}</Table.Cell>
                 <Table.Cell>{cuser.isAdmin ? (<TiTick className="w-6 h-6 text-teal-400 " />):(<ImCross className="w-4 h-4 text-red-500 "/>) }</Table.Cell>
                 <Table.Cell>
                  <span onClick={()=>{
                    setShoeModel(true);
                    setusersid(cuser._id)
                    

                  }} className="text-red-500 font-medium hover:underline cursor-pointer ">Delete</span>
                 </Table.Cell>
                 <Table.Cell >
                  <Link to={`/update-post/`} ><span className="text-teal-400" >Edit</span></Link>
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
       
        
        
        
        </>):(<p>No Users Yet</p>)
      }
      <Modal show={showmodel} size="md" onClose={() => setShoeModel(false)} popup>
        <Modal.Header/>
        <Modal.Body>
              <div className='text-center'>
                <IoMdInformationCircleOutline className='w-14 h-14 text-cyan-500 dark:text-cyan-200 mb-4 mx-auto '/>
                <h2 className='mb-5 text-lg font-serif  text-cyan-700 dark:text-cyan-300 '>Are You Sure You Want To Delete this user !!</h2>
                <div className='flex  justify-between items-center'>
                  <Button color='failure' onClick={handledeleteuser} >yes,I am sure</Button>
                  <Button onClick={()=>setShoeModel(false)} color='blue' >No, Cancel</Button>
                </div>

                

              </div>
          </Modal.Body>
       </Modal>
    </div>
  )
}

export default DashUser