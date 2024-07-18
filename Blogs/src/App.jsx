import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from "./pages/Dashboard"
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Header from "./Components/Header"
import Footers from "./Components/Footer"
import Privateroute from "./Components/privateroute"
import AdminPrivateroute from "./Components/AdminPrivateRoute"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/Updatepost"
import Posts from "./pages/posts"
import ScrolltoTop from "./Components/ScrolltoTop"
import Searchpage from "./pages/Searchpage"


function App() {
  return (
    <BrowserRouter>
    <ScrolltoTop/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route element={<Privateroute/>} >
      <Route path="/dashboard" element={<Dashboard/>} />
      </Route>
      <Route element={<AdminPrivateroute/>} >
      <Route path='create-post' element={<CreatePost/>} />
      <Route path='update-post/:postid' element={<UpdatePost/>} />
      </Route>
      <Route path="/post/:postId" element={<Posts/>} />
      <Route path="/search" element={<Searchpage/>}  />
      
    </Routes>
    <Footers/>
    </BrowserRouter>
  )
}

export default App