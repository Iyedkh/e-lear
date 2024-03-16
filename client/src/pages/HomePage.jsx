import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/courses');
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                } else {
                    console.error('Failed to fetch courses:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const styles = `

    .NavBar {
        background-color: #1976d2; /* Adjust the background color as needed */
    }
    
    .search-bar {
        display: flex;
        align-items: center;
        margin-left: auto; /* Align search bar to the right */
    }
    
  
    .container {
      background-color: aqua;
      display: flex; /* Changed to flex */
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 20px;
      margin-top: 20px;
  }
  
  .title {
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
      padding: 10px;
      background-color: rgb(240, 240, 240); /* Choose your desired color */
      width: 100%; /* Ensure title takes full width */
  }
  
  .link {
      font-size: 18px;
      margin-bottom: 20px;
      display: block;
      width: fit-content;
      padding: 10px 20px;
      background-color: rgb(100, 100, 200); /* Choose your desired color */
      color: white;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
  }
  
  .card {
      width: calc(33.33% - 20px); /* Three cards per row with some space in between */
      margin-bottom: 20px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
  }
  
  .card:hover {
      transform: translateY(-5px);
  }
  
  .card-content {
      padding: 20px;
  }
  
  .card-title {
      font-size: 20px;
      margin-bottom: 10px;
  }
  
  .rating {
      margin-bottom: 10px;
  }
  
  .description {
      margin-bottom: 20px;
  }
  
  .watch-button {
      display: block;
      width: 100%;
      padding: 10px 0;
      text-align: center;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }
  
  .link:hover {
      background-color: rgb(80, 80, 180); /* Choose your desired hover color */
  }
  
  .watch-button:hover {
      background-color: #0056b3;
  }
  
  @media screen and (max-width: 767px) {
      .card {
          width: 100%; /* One card per row on phones */
      }
  }
  
  @media screen and (min-width: 768px) {
      .container {
          width: 100%; /* Take full width on screens larger than 768px */
          justify-content: space-around; /* Center items horizontally */
      }
  }
  
    `;

    return (
        
            <>
                <NavBar /> {/* Include NavBar component */}
                <SearchBar /> {/* Include SearchBar component */}
                <style>{styles}</style>
                <div className="title">Courses Page</div>
                <Link to="/create-course" className="link">Create New Course</Link>
                <div className="container">
                    {courses.map(course => (
                        <Card key={course._id} className="card">
                            <CardContent className="card-content">
                                <Typography variant="h5" component="h2" className="card-title">
                                    {course.title}
                                </Typography>
                                <Typography color="textSecondary" className="rating">
                                    Rating: {course.rating}
                                </Typography>
                                <Typography variant="body2" component="p" className="description">
                                    Description : {course.description}
                                </Typography>
                                <Button variant="contained" color="primary" href={course.videoUrl} target="_blank" className="watch-button">
                                    Watch Now
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </>
        );
    };

export default HomePage;
