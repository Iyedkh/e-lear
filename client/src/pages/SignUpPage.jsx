import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState('user');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const SimpleNavbar = () => {
    return (
      <header className="hdr">
        <div className='logh'>
          <div className="navigation d-flex align-items-center justify-content-between">
            <div className="logo">
              <h2 className="d-flex align-items-center gap-1">
                <i className="ri-pantone-line"></i> Infinite.
              </h2>
            </div>
          </div>
        </div>
      </header>
    );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('city', city);
    formData.append('role', role);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:3000/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/');
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <>
      <SimpleNavbar />
      <div className="signup-page">
        <form onSubmit={handleSignUp} encType="multipart/form-data">
          <h2>Sign Up</h2>
          {error && <p>{error}</p>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p><span className='span'>*</span>Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.</p>
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label>Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
