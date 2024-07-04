import {useSelector} from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

function AdminPrivateroute() {
  const {currentUser}=useSelector((state)=>state.user)
  return currentUser && currentUser.isAdmin ? <Outlet/>:<Navigate to='/signin' />
    
}

export default AdminPrivateroute