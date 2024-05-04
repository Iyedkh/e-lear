import React, { useState }  from 'react';
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import about from "../components/assests/images/About.jpg";
import heroImg from "../components/assests/images/hero.png";
import features from "../components/assests/images/courses8.jpg";
import NavBar from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { CgMail } from "react-icons/cg";
import career from '../components/assests/images/Career_Center.png';
import career2 from '../components/assests/images/Career_Center_portfolio.png';
import career3 from '../components/assests/images/Career_Center_Professional_certifications__.png';
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
        
        <div className="job">
          <div className="tit">
            <h2>Get job-ready</h2>
            <p>Showcase your skills with portfolio projects and a professional certification, then see if you’re ready to apply to your dream job.</p>
          </div>
          <div className="grid">
            <div className="grid1">
              <div className="feature-card">
               <img src={career}  className="feature-card__image" />
               <h2 className="">Job-readiness checker</h2>
               <p className="">Use AI to evaluate how well you meet the requirements for a given role based on your skills and experience.</p>
                <button className="btn-">Try it out</button>
              </div>
            </div>
            <div className="grid2">
            <div className="feature-card">
               <img src={career2}  className="feature-card__image" />
               <h2 className="">Portfolio projects</h2>
               <p className="">Apply what you’re learning to create robust, recruiter-ready projects for your portfolio.</p>
                <button className="btn-">Explore projects</button>
              </div>
            </div>
            <div className="grid3">
            <div className="feature-card">
               <img src={career3}  className="feature-card__image" />
               <h2 className="">Certifications</h2>
               <p className="">Prove your expertise to yourself and prospective employers — pass all exams in select career paths to earn a professional certification.</p>
                <button className="btn-">Learn more</button>
              </div>
            </div>
          </div>
          
        </div> 
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