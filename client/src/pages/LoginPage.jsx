import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
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
      
    <div className="login-page">
      
   
      <form className='logfor' onSubmit={handleLogin}>
      <div className="Titl">
         <i className="ri-pantone-line"></i> Infinity.
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
        <Link  to={'/signup'}>you don't have account? <br />Register now.</Link>
      </form>
    </div>
    </>
   
    
  );
};

export default LoginPage;
