// EnrollPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import chooseImg from "../assests/images/why-choose-us.png";
import SideBar from './Sidebar';
import Comment from './CommentForm';
import ReactPlayer from "react-player";
import './EnrollPage.css';
import { FaStar } from "react-icons/fa";


const EnrollPage = () => {
  const [course, setCourse] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [rating, setRating] = useState(0); 
  const { courseId } = useParams();
  const [hover, setHover] = useState(0);
  const fetchCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/courses/${courseId}`);
      if (response.status === 200) {
        setCourse(response.data);
      } else {
        console.error('Failed to fetch course:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]); 

  const handleRatingSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/rate-course/courses/${courseId}/ratings`, { stars: rating });
      if (response.status === 201) {
        console.log('Rating submitted successfully');
        fetchCourse();
      } else {
        console.error('Failed to submit rating:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
    window.location.reload();
  };
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/rate-course/courses/${courseId}/ratings`);
        if (response.status === 200) {
          setRatings(response.data.ratings);
          calculateAverageRating(response.data.ratings);
        } else {
          console.error('Failed to fetch ratings:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, [courseId]);
  
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      setAverageRating(0);
    } else {
      const totalRating = ratings.reduce((acc, curr) => acc + curr.stars, 0);
      const avgRating = totalRating / ratings.length;
      setAverageRating(avgRating);
    }
    
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" md="8" sm="12">
            <div className="choose__img">
              {showVideo ? (
                <React.Fragment>
                  <ReactPlayer
                    url={course?.videoUrl}
                    controls
                    width="100%"
                    height="350px"
                  />
                  
                </React.Fragment>
              ) : (
                <img src={chooseImg} alt="" className="w-100" />
              )}

              {!showVideo && (
                <span className="play__icon">
                  <i
                    className="ri-play-circle-line"
                    onClick={() => setShowVideo(!showVideo)}
                  ></i>
                </span>
              )}
              <div className="title mt-2">
                <h6>{course?.title}</h6>
                <div className="d-flex justify-content-around">
                  <p>Category: {course?.category}</p>
                  <p>Description:  {course?.description}</p>
                </div>     
              </div> 
                <div>
                  <p>Average Rating: {averageRating.toFixed(2)} </p>
                </div>            
            </div>           
          </Col>

          <Col lg="4" md="4" sm="12">
            <SideBar/>
          </Col>
          <div className="rating mt-2">
        <h6>Rate this course</h6>
        <Form onSubmit={handleRatingSubmit}>
          <FormGroup tag="fieldset">
            {[1, 2, 3, 4, 5].map((star) => (
              <FormGroup check inline key={star}>
                <Label check>
                  <Input
                    type="radio"
                    name="rating"
                    value={star}
                    onChange={() => setRating(star)}
                    style={{ display: "none" }} // Hide radio button
                  />
                  <FaStar
                    color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    size={25}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  />
                </Label>
              </FormGroup>
            ))}
          </FormGroup>
          <Button type="submit" color="primary">Submit Rating</Button>
        </Form>
      </div>
    
 
          <div className="comment mt-2">
            <Comment courseId={courseId} />
          </div>
          
         
        </Row>
      </Container>
    </section>
  );
};

export default EnrollPage;
