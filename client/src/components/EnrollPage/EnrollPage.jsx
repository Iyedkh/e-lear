import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import chooseImg from "../assests/images/why-choose-us.png";
import SideBar from './Sidebar';
import Comment from './CommentForm';
import ReactPlayer from "react-player";

const EnrollPage = () => {
  const [course, setCourse] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const { courseId } = useParams(); // Access course ID from route parameters

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/courses/${courseId}`); // Fetch course by ID
        if (response.status === 200) {
          setCourse(response.data);
        } else {
          console.error('Failed to fetch course:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [courseId]); // Dependency array includes courseId for refetching on ID change

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" md="8" sm="12">
            <div className="choose__img">
              {showVideo ? (
                <ReactPlayer
                  url={course?.videoUrl} // Access videoUrl from fetched course data
                  controls
                  width="100%"
                  height="350px"
                />
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
                  <h6 >{course?.title}</h6>
                    <div className="d-flex justify-content-around">
                         <p>Category : {course?.category}</p>
                         <p>Description :  {course?.description}</p>
                    </div>     
                </div>             
            </div>           
         </Col>

          <Col lg="4" md="4" sm="12">
            <SideBar/>
          </Col>
          <Comment/>
        </Row>
      </Container>
    </section>
  );
};

export default EnrollPage;
