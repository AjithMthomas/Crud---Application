import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { ToastContainer } from 'react-toastify';
import './LoginPage.css';

function LoginPage() {
  const { loginUser } = useContext(AuthContext);

  return (
    <div className="LoginPage">
       <ToastContainer limit={1}  position='top-center'></ToastContainer>
      <h2>Log In</h2>
      <form onSubmit={loginUser}>
        <label>
           Email:
          <input  type="text" name="username" placeholder="Enter email" />
        </label>
        <label>
          Password:
          <input type="password"  name="password" placeholder="Enter password" />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}

export default LoginPage;
