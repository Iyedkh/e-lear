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
  const [step, setStep] = useState(1); // State to manage the current step
  const navigate = useNavigate();

  const handleNext = () => {
    if (email && password) {
      setStep(2);
    } else {
      setError('Please fill out email and password');
    }
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
      <div className="signup-page">
        <form onSubmit={handleSignUp} encType="multipart/form-data" className='SignF'>
          <h2>Sign Up</h2>
          {error && <p>{error}</p>}
          {step === 1 && (
            <>
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
              <button type="button" onClick={handleNext}>Next</button>
            </>
          )}
          {step === 2 && (
            <>
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
                <label>Profile Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <button type="submit">Sign Up</button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
