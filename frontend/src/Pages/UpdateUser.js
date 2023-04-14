import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { useNavigate, useParams ,Link } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'
import { toast ,ToastContainer} from 'react-toastify'
import './UpdateUser.css'

function UpdateUser() {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState ('')
    const [password,setPassword] = useState('')
    const [getUser,setUser] = useState({
        username:'',
        email:''  
    })
    const {logout} = useContext(AuthContext)
    const history = useNavigate()
    const id = useParams()

    useEffect(()=>{
        async function getUser(){
            const getUser = await axios.get(`http://localhost:8000/api/updateUser/${id.user_id}/`)
            setUser(getUser.data)
        }
        getUser();
    },[])


    const userUpdateForm = async (e)=>{

        e.preventDefault()                       
        console.log(id.user_id);
        const response = await fetch (`http://localhost:8000/api/updateuserForm/${id.user_id}/`,{
            method:'POST',
            headers:{'content-Type':'application/json'},
            body: JSON.stringify({
                username,
                email,
                password                     
            })
        })
        console.log(response)
        history('/dashboard')
        toast.success('user updated')   
    }                                                                                                                         
    
  return (
    <div className='cover'>
    <div className="update-user-container">
        <div>
            <h1>Update User</h1>
        </div>
        <div>
            <form onSubmit={userUpdateForm}>
                <h2>Update User Here</h2>
                <input type='text' name='username' placeholder='username' Value={getUser.username}
                onChange={(e)=>setUsername(e.target.value)}/>
                <input type='text' name='email' placeholder='email'  Value={getUser.email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <input type='password' name='password' placeholder='password'
                onChange={(e)=>setPassword (e.target.value)}/>
                <input type='submit' value='Update'/>
            </form>
        </div>
    </div>
     </div>
  )
}

export default UpdateUser
