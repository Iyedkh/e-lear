import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
const HomePage = () => {
  return (
    <div>
     <Navigation />
      <h1>Welcome to Our Website</h1>
      <p>This is the homepage of our website.</p>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
    </div>
  );
}

export default HomePage;
