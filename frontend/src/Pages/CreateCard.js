import React, { useContext, useState } from 'react';
import axios from 'axios';
import './CreateCard.css'; // import CSS file
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const CreateCard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const history = useNavigate()
  const {logout} =useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/CreateCard/', formData);
     history('/dashboard')
     toast.success('Card added succesfully')
      
    } catch (error) {
      toast.error('Failed to add the card');
    }
  };

  return (
   <div className='bg'>
    <div className="create-card">
      <form className="create-card-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="textt"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            className="form-control-file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Card</button>
      </form>
    </div>
    </div>
  );
};

export default CreateCard;
