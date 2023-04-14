import { Navigate,Outlet} from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext'


const PrivateRoute=({children,...rest}) =>{
    let {user} = useContext(AuthContext)
   console.log(user)
    if(user) {
        return<Outlet/>
    }else{
        return < Navigate to={"/login"}/>
        }
}

export default PrivateRoute