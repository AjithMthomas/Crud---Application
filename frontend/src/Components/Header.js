import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import './Header.css';

const Header = () => {
  let { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Crud Application
      </Link>
      
      <div className="navbar-links">
       
        {user ? (
          <>
            <Link to='/userProfile' className="navbar-link">Profile</Link>
            <p onClick={logout} className="navbar-link">
              Logout
            </p>
            <p className="navbar-welcome">
              Hello, {user.username}!
            </p>
          
          </>
        ) : (
          <>
          <Link to='signup' className="navbar-link">Signup</Link>
          <Link to="/login" className="navbar-link">
            Login
          </Link>
          </> 
        )}
      </div>
    </nav>
  );
};

export default Header;
