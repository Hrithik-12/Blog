import {Button, FileInput, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
  return (
    <div className=' p-3 max-w-3xl min-h-screen mx-auto '>
      <h1 className='text-3xl text-center my-7 font-semibold text-cyan-500  '>Create Post</h1>
      <form className='flex flex-col gap-4 '>
        <div className='flex flex-col gap-4 sm:flex-row justify-between  '>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
          <Select>
            <option value="uncategorized" >Select a category</option>
            <option value="js">JS</option>
            <option value="react">React.js</option>
            <option value="Next js">Next.js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3 '>
          <FileInput type='file' accept='image/*'  />
          <Button type='button' gradientDuoTone='purpleToBlue' outline size='sm' >Upload Image</Button>



        </div>
        <ReactQuill theme='snow' placeholder='Let The Creativity flow.... ' className='h-72 mb-10 ' required/>
        <Button type='submit'  gradientDuoTone='purpleToBlue' >Publish This Post</Button>
      </form>
    </div>
  )
}

export default CreatePost