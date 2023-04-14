import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast ,ToastContainer} from 'react-toastify'
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Dashboard.css'
import AuthContext from '../Context/AuthContext';

function Dashboard() {
    const [userList,setUserList] = useState([])
    
    
    useEffect(() => {
        async function getUserList() {
            const response = await axios.get('http://127.0.0.1:8000/api/userList/')
            console.log('userlist',response.data)
            setUserList(response.data)
        }
        
        getUserList()
        
    }, [])

    async function searchUser(keyword) {
        const request = await axios.get(`http://127.0.0.1:8000/api/userList/?search=${keyword}`)
        console.log(request)
        if (request.data.legth === 0) {
            toast.error('No users found')
        }
        setUserList(request.data)
    }

    async function deleteUser(userId) {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/deleteUser/${userId}/`)
                setUserList(userList.filter(user => user.id !== userId))
                toast.success('User deleted successfully!')
            } catch (error) {
                toast.error('Failed to delete user')
            }
        }
    }

    return (
        <div className="dashboard-container">
            <ToastContainer limit={1} position='top-center'></ToastContainer>
            <div className="navebar">
                <Link to='/'><span> <AiOutlineHome/>Home</span></Link> 
                <Link to='/CreateCard'><span> <AiOutlinePlus/>Add Card</span></Link> 
                <Link to='/adduser'><span id='middleSpan'><AiOutlinePlus/>Add User</span></Link>
              
            </div>
            <div className="dashboard-search-container">
                <h1 id='dashba'>AdminDashboard</h1>
                <input type='text' className='search' placeholder='Search here'
                    onChange={e => searchUser(e.target.value)}
                />
            </div>
            <div className="dashboard-table-container">
                <h1 className='h1'>User List</h1>
                {userList.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th id='actionhead'>Action</th>  
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span id='action'>
                                            <Link to={`/updateUser/${user.id}`}><button id='edit'>Edit <AiFillEdit/></button></Link>
                                            <button id='delete' onClick={() => deleteUser(user.id)}>Delete <AiFillDelete/></button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     ):(
               <h1 className='notfound'>
                <img src='https://media.giphy.com/media/l2JhQ2GitIyBRzm6w/giphy.gif' alt='Not Found'/>
             </h1>
             
            )}
        </div>
    </div>
  )
}

export default Dashboard
