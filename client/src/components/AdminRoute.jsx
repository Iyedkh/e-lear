import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/" />;
    }
    
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.role !== 'admin') {
            return <Navigate to="/home" />;
        }
    } catch (e) {
        return <Navigate to="/" />;
    }

    return <Component {...rest} />;
};

export default AdminRoute;
