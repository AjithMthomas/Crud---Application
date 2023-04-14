import { createContext,useState,useEffect } from "react";
import jwt_decode from "jwt-decode";
import {  useNavigate } from 'react-router-dom';
import{toast} from 'react-toastify'



const AuthContext = createContext()

export default AuthContext;



export const AuthProvider = ({children})=>{
   
    let [authTokens,setAuthTokens] = useState(()=> localStorage.getItem('authTockens') ? JSON.parse( localStorage.getItem('authTockens') ): null)
    let[user,setUser] = useState(()=> localStorage.getItem('authTockens') ? jwt_decode( localStorage.getItem('authTockens') ): null)
    

    const history = useNavigate()
   

    let loginUser = async(e) =>{
        e.preventDefault()
        
        let response = await fetch ('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.username.value,'password':e.target.password.value})
        })
       
        // const response  = await axios.post('http://127.0.0.1:8000/api/token/',{'email':e.target.username.value,'password':e.target.password.value})
        console.log(response)
        let data = await response.json()
        console.log('jkidkdkod',response)
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            if(user.is_admin){
                history('/dashboard')
            }else{
                history('/')
            }
            
            
        }else{
            toast.error('Bad Credentials')
        }
    }
    let logout =()=>{
        setAuthTokens(null)
            setUser(null)
            localStorage.removeItem('authTokens')
            history('/login',{replace:true})
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logout:logout
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}