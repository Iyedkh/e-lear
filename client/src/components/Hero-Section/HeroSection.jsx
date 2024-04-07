import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import "./hero-section.css";
import heroImg from "../assests/images/hero-img1.png";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleSearch = () => {
    // Navigate to the search results page with the search query
    navigate(`/search/${searchQuery}`); // Use navigate instead of history.push
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
          {/* Add your image here */}
          <Col lg="6" md="6">
          <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
