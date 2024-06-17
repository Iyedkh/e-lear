import React, { useEffect, useRef, useState } from "react";
import { Container } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import "./header.css";

const Header = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    const storedImage = localStorage.getItem('image');


    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedRole) {
      setRole(storedRole);
    }
    if (storedImage) {
      setImage(`http://localhost:3000/${storedImage.replace(/\\/g, '/')}`); 
    }
  }, []);

  const handleLogout = () => {
    logout(navigate);
  };

  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const navLinks = [
    {
      display: "Home",
      url: "/home",
    },
    {
      display: "About",
      url: "/About",
    },
    {
      display: "Courses",
      url: role === 'admin' ? "/course" : "/userC",
    },
    
  ];

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className="d-flex align-items-center gap-2">
              <i className="ri-pantone-line"></i> Infinity.
            </h2>
          </div>

          <div className="nav d-flex align-items-center ">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list gap-5">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div>

            
            
          </div>
          <div className="nav__user d-flex align-items-center gap-4">
              {image && <img src={image} alt="User" className="user-image" />}
              <span>{username || 'Guest'}</span>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
            
          <div className="mobile__menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
