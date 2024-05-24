import React, { useEffect, useRef, useState } from "react";
import { Container } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import "./header.css";

const Header = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role'); // Assuming role is stored in local storage
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedRole) {
      setRole(storedRole);
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
    {
      display: "Pages",
      url: "#",
    },
    {
      display: "Blog",
      url: "#",
    },
  ];

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className=" d-flex align-items-center gap-1">
              <i className="ri-pantone-line"></i> Infinite.
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right">
              <p className="mb-0 d-flex align-items-center gap-2">
                <i className="ri-phone-line"></i> +216 93 117 612
              </p>
            </div>
            <div className="nav__user">
              <p className="mb-0 d-flex align-items-center gap-2">
                <i className="ri-user-line"></i> {username || 'Guest'}
              </p>
            </div>
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
