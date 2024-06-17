import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import "./hero-section.css";
import heroImg from "../assests/images/hero-img1.png";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 

  const handleSearch = () => {
    navigate(`/search/${searchQuery}`); 
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
                Anytime Anywhere <br /> Learn on your <br /> Suitable Schedule
              </h2>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Aut saepe voluptatum earum delectus <br /> deserunt id iste,
                quas officiis et repellat!
              </p>
              <div className="search">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </Col>
          
          <Col lg="6" md="6">
          <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
