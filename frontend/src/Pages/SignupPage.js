import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './SignupPage.css';

function SignupPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useNavigate()

  const SignupSubmit = async(e) => {
    e.preventDefault()
    const response = await fetch('http://127.0.0.1:8000/api/register/',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
console.log(response);
    if (response.status === 400) {
      toast.error('Please enter all details')
       history('/signup')
    } else {
       history('/login')
    }     
  }

  return (
    <div className="signup-container">
       <ToastContainer limit={1}  position='top-center'></ToastContainer>
      <div className="signup-card">
        <h1>Sign Up</h1>
        <form onSubmit={SignupSubmit}>
          <input
            type='text'
            name='username'
            placeholder='Enter your Username'
            onChange={e => setUsername(e.target.value)}
          />

          <input
            type="email"
            name='email'
            placeholder='Enter your Email'
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            name='password'
            placeholder='Enter your Password'
            onChange={e => setPassword(e.target.value)}
          />
          <input type="submit" value='SIGNUP' />
          <div className="login-link-container">
            <p>Have an account?</p>
            <p><Link to='/login'>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignupPage;
