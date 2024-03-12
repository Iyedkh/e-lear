// SignInPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignInPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const history = useHistory(); // Initialize useHistory

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signin', formData);
            console.log(response.data); // Log the response data or handle accordingly
            // Redirect to home page if sign-in is successful
            history.push('/home');
        } catch (error) {
            console.error('Error signing in:', error);
            // Handle error response or display error message to user
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignInPage;
