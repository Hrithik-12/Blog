import { Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";


function DashPosts() {
  // let fetch the post accoring to which user made that post
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/auth/posts/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return (
    <div className="p-2">
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
              <Table.Body key={ind} >
                <Table.Row>
                  <Table.Cell>{ new Date(posts.updatedAt).toLocaleDateString() }</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${posts.slug}`} >
                    <img src={posts.image} alt={posts.title}  className="w-20 h-10 object-cover bg-gray-500 "/>
                    </Link>

                  </Table.Cell>
                 <Link to={`/post/${posts.slug}`} > <Table.Cell>{posts.title}</Table.Cell></Link>
                 <Table.Cell>{posts.category}</Table.Cell>
                 <Table.Cell>
                  <span className="text-red-500 font-medium hover:underline cursor-pointer ">Delete</span>
                 </Table.Cell>
                 <Table.Cell>
                  <Link to={`/update-post/${posts._id}`} ><span className="text-teal-400" >Edit</span></Link>
                 </Table.Cell>
                </Table.Row>

              </Table.Body>
            ))
          }


        </Table>
        
        
        
        </>):(<p>No Post Yet</p>)
      }
    </div>
  )
}

export default DashPosts