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


function App() {
  return (
    <BrowserRouter>
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
      </Route>
    </Routes>
    <Footers/>
    </BrowserRouter>
  )
}

export default App