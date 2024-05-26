import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3000/auth/login', {
            email,
            password
        });

        console.log('Login response:', response.data);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('city', response.data.city);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('image', response.data.image);  // Store the image URL

        navigate('/home');
    } catch (err) {
        setError('Invalid credentials');
    }
};


  return (
    <>
      <SimpleNavbar />
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
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
        </div>
        <div className="sign">
           <button type="submit">Login</button>
        <Link className='btn2' to={'/signup'}>Sign up</Link>
        </div>
       
      </form>
    </div>
    </>
   
    
  );
};

export default LoginPage;
