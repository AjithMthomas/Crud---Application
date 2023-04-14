import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import './UserProfile.css';

function UserProfile() {
  const [profile, setProfilePic] = useState();
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState();
  const history = useNavigate();
  const [singleUser, setUser] = useState({
    username: '',
    email: '',
    profile: ''
  });
  
  useEffect(() => {
    console.log(singleUser)
    async function getUser() {
      const getUser = await axios.get(`http://localhost:8000/api/updateUser/${user.id}/`);
      setUser(getUser.data);
    }
    getUser();
    
  }, []);
  

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/updateuserForm/${user.id}/`, {
        profile,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      history('/userProfile');
      toast.success('profile picture added');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  
  
  return (
    <div className="user-profile-container">
      <div className="nav-bar"></div>
      <div className="user-profile">
        <img src={singleUser.profile_img ? 'http://localhost:8000' + singleUser.profile_img : 'profile'} alt="profile pic" />
        <form onSubmit={updateProfile}>
          <label htmlFor="profile-img-input" className="profile-img-label">
            Choose a profile picture
          </label>
          <input id="profile-img-input" type="file" name="profile_img" onChange={(e) =>URL.createObjectURL(event.target.files[0])(e.target.value)} />
         
          <button type="submit" className="upload-img-btn">
            Upload
          </button>
        </form>
        <h2 className="username">{singleUser.username}</h2>
        <h3 className="email">{singleUser.email}</h3>
        <p className="about">
       " Apart from coding, I enjoy hiking and spending time in nature. I find it refreshing to disconnect from technology and be surrounded by the beauty of the outdoors."
        </p>
      </div>
      <div className="connect-section">
        <h3 className="nav-link">Connect</h3>
        <h3 className="follow-link">Follow</h3>
        <h3 className="logout-link">Log Out</h3>
      </div>
      <ToastContainer limit={1} position="top-center" />
    </div>
  );
}

export default UserProfile;
