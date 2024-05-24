import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [city, setCity] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/auth/register', {
                email,
                password,
                username,
                city,
                role
            });

            navigate('/');
        } catch (err) {
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <div className="signup-page">
            <form onSubmit={handleSignUp}>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpPage;
