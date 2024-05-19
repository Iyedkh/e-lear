// src/utils/auth.js

export const logout = (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };
  