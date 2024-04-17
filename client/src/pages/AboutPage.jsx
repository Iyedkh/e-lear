import React, { useState }  from 'react';
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import about from "../components/assests/images/About.jpg";
import heroImg from "../components/assests/images/hero.png";
import features from "../components/assests/images/courses8.jpg";
import NavBar from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { CgMail } from "react-icons/cg";


const Enroll = () => {
    return (
      <div>
        
        <NavBar/>
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
                Infinite <br /> Learn on your <br /> Suitable Schedule
              </h2>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Aut saepe voluptatum earum delectus <br /> deserunt id iste,
                quas officiis et repellat!
              </p>
              
            </div>
          </Col>
          
          <Col lg="6" md="6">
          <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>

    <section class="about">
    <div class="section" id="about">
    <div class="grid-container">
      <div class="border-container">
        <img src={about} alt="" class="image" />
      </div>
      <div>
        <div class="title">
          We provide the <br /> best <span class="highlight">online courses</span>
        </div>
        <p class="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, totam earum. Minus deleniti repellat id! Ratione quia
          eum, explicabo quos eos magni vel corporis voluptatibus, inventore doloremque aliquam pariatur recusandae.
        </p>
        <button class="btn">Know More</button>
      </div>
    </div>
    </div>
    </section>
    <section className='features'>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="title">
              All Time Support
              </h2>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Aut saepe voluptatum earum delectus <br /> deserunt id iste,
                quas officiis et repellat! <br />
                <CgMail /><a href="#" className='a-mail'>iyedkhouildi12@gmail.com</a>
              </p>
              
              <div className="follows">
              <p className="mb-0">Follow us on social media</p>
              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-facebook-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-instagram-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-linkedin-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i class="ri-twitter-line"></i>
                </a>
              </span>
            </div>
            </div>
          </Col>
          
          <Col lg="6" md="6">
          <img src={features} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
    <div class="contact" id="contact">
        <div class="text-center max-w-600 mx-auto">
            <div class="title" >
                 Subscribe Newsletter
             </div>
        <p class="description">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum autem minus doloribus voluptatem illo velit quia eum aperiam! Repudiandae, tempore. Lorem ipsum dolor sit amet.
        </p>
    <form class="mt-5">
      <input type="text" placeholder="Enter your email address" class="input" />
      <button class="btns">Subscribe</button>
    </form>
  </div>
    </div>

   
        <Footer/>
       
      </div>
    );
  };
export default Enroll;