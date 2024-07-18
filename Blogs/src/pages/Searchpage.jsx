import {Button, Select, Spinner, TextInput} from 'flowbite-react'
import { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Postcard from '../Components/Postcard'

function Searchpage() {
  const[sidebardata,setSidebardata]=useState({
    searchTerm:'',
    sort:'desc'
   
  });

  const[loading,setLoading]=useState(false)
  const[post,setposts]=useState([]);
  const[showmore,setshowmore]=useState(false)
  const location=useLocation();
  const navigate=useNavigate()


  useEffect(()=>{

    const urlparamsfromsearch=new URLSearchParams(location.search);
    const searchtermfromurl=urlparamsfromsearch.get('searchTerm');
    const sortformurl=urlparamsfromsearch.get('sort');
    // const categoryformurl=urlparamsfromsearch.get('category');

    if(searchtermfromurl || sortformurl){
      setSidebardata({
        ...sidebardata,
        searchTerm:searchtermfromurl,
        sort:sortformurl,
        // category:categoryformurl
      })
    }
    const fetchpost=async ()=>{
      setLoading(true)
      const searchquery=urlparamsfromsearch.toString();
      const res=await fetch(`/auth/posts/getposts?${searchquery}`)
      const data=await res.json();
      if(!res.ok){
        console.log('error')

      }
      else{
        setposts(data.posts)
       setLoading(false)
       if(data.posts.length===9){
        setshowmore(true)
       }else{
        setshowmore(false);
       }
      }
    }
    fetchpost()

  },[location.search])
   const handlechange=(e)=>{
    if(e.target.id==='serachTerm'){
      setSidebardata({...sidebardata,searchTerm:e.target.value})
    }
    if(e.target.id==='sort') {
      const order=e.target.value || 'desc'
      setSidebardata({...sidebardata,sort:order});
    }

    // if(e.target.id==='category'){
    //   const categ=e.target.value || 'uncategorised'
    //   setSidebardata({...setSidebardata,categ})
    // }

   }

   const handlesubmit=async (e)=>{
    e.preventDefault();
    const urlparams=new URLSearchParams(location.search);
    urlparams.set('searchTerm',sidebardata.searchTerm);
    urlparams.set('sort',sidebardata.sort);
    // urlparams.set('category',sidebardata.category);
    const searchquery=urlparams.toString();
    navigate(`/search?${searchquery}`)
    

   }
   const handleshowmore=async ()=>{
    const numberofpost=post.length;
    const startIndex=numberofpost;
    const urlparams=new URLSearchParams(location.search);
    urlparams.set('startIndex',startIndex);
    const searchquery=urlparams.toString();
    const res=await fetch(`/auth/posts/getposts/${searchquery}`)
    const data=await res.json();

    if(res.ok){
      setposts({...post,...data.posts})
      if(data.posts.length ===9){
        setshowmore(true)
      }else{
        setshowmore(false)
      }
    }
   }
 



  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen border-gray-500 ' >
        <form className='flex flex-col gap-8' onSubmit={handlesubmit} >
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold' >search term:</label>
            <TextInput placeholder='search' id='searchterm' type='text' value={sidebardata.searchTerm} onChange={handlechange} />
          </div>
          <div className='flex items-center gap-2'>
            <label  className='whitespace-nowrap font-semibold' >Sort:</label>
          <Select onChange={handlechange} value={sidebardata.sort} id='sort'  >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>

          </Select>
          </div>
          {/* <div className='flex items-center gap-2'>
            <label  className='whitespace-nowrap font-semibold' >Category:</label>
          <Select onChange={handlechange} value={sidebardata.category} id='category'  >
            <option value="uncategorized">Uncategorized</option>
            <option value="react js">React</option>
            <option value="nextjs">Next js</option>
            <option value="js">javascript</option>

          </Select>
          </div> */}
          <Button type='submit' outline gradientDuoTone={'purpleToBlue'}  >Apply filters</Button>
        </form>
      </div>
      <div className='w-full p-3 '>
        <h1 className='text-3xl font-semibold sm:border-b p-3 border-gray-500 '>Post Result</h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {
           !loading && post.length === 0 && <p className='text-xl text-gray-300'>No post found</p>
          }
          {
            loading && (
              <Spinner/>
            )
          }
          {
            !loading && post &&  post.map((post)=>(
              <Postcard key={post._id} post={post} />
            ))
          }
         

        </div>
        {
            showmore && <button onClick={handleshowmore} className='w-fit h-fit font-bold bg-amber-200 border-[1px] border-solid border-rose-400 rounded-full p-1 text-xl '>Show more</button>
          }
      </div>
    </div>
  )
}

export default Searchpage