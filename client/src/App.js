import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div>
        {/* Define routes */}
        <Routes>  
          <Route path="/" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

