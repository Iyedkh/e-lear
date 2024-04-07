import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import CourseCard from "../components/TopRated/CourseCard";
import Footer from "../components/Footer/Footer";
import NavBar from '../components/Header/Header';
import axios from "axios";
import { useParams } from 'react-router-dom';

const SearchedCoursesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/search/search?title=${query}`);
        if (response.status === 200) {
          setSearchResults(response.data);
        } else {
          console.error('Failed to fetch search results:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <section>
      <Container>
      <NavBar />
       
        <Row>
          {searchResults.map(course => (
            <Col key={course._id} lg="4" md="6" sm="12">
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </Container>
       <Footer />
    </section>
    
  );
 
};

export default SearchedCoursesPage;
