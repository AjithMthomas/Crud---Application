import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { useContext } from 'react';
import './AddUser.css'
import AuthContext from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';


function AddUser() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const{logout} = useContext(AuthContext)

    const history = useNavigate()

    const addUser = async (e) => {
        e.preventDefault()
        if(username===""||email===""||password===""){
            toast.error('All fields are required')
        }else{
            const user = await fetch('http://127.0.0.1:8000/api/register/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username,
            email,
            password
          })
        })
       
        history('/dashboard');
        
    }
        }
    
        

    return (
        <div className='dashboard-div'>
            <ToastContainer position='top-center' limit={1}></ToastContainer>
            <div className='form-contain'>
                <form className='add-user-form' onSubmit={addUser}>
                    <h2 className='adduser'>Add New User Here</h2>
                    <input className='add-user-input' type="text" name='username' placeholder='Username'
                        onChange={e=>setUsername(e.target.value)}
                    />
                    <input  id='email' className='add-user-input' type="text" name='email' placeholder='Email'
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <input className='add-user-input' type="password" name='password' placeholder='Password'
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <input className='add-user-button' type="submit" value='Add User'/>
                </form>
            </div>
        </div>
    )
}

export default AddUser
