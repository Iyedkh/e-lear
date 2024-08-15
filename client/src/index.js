import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import './index.css';

import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}> {/* Wrap your app with GoogleOAuthProvider */}
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
