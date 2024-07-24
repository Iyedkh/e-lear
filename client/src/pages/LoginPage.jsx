import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import inf from "../components/assests/images/infinity.png";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      console.log('Token received:', token);  // Check if token is correctly received
      localStorage.setItem('token', token);
      navigate('/home');
    }
  }, [navigate]);

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
      localStorage.setItem('image', response.data.image);
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Initiating Google login');
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="login-page">
      <form className='logfor' onSubmit={handleLogin}>
        <div className="Titl">
          <img className='infimg' src={inf} alt="Infinity Logo" />
          <h2>Infinity.</h2>
        </div>
        {error && <p>{error}</p>}
        <div>
          <label>Email:</label>
          <div className="inp">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label>Password:</label>
          <div className="inp">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="sign">
          <button className='loginB' type="submit">Login</button>
        </div>
        <p>Don't have an account? <Link to={'/signup'}>Register now.</Link></p>
      </form>
      <div>
        <button className='loginB' onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </div>
  );
};

export default LoginPage;
