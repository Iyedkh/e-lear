// HomePage.jsx

import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

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
      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 20px;
      }

      .title {
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
      }

      .link {
        font-size: 18px;
        margin-bottom: 20px;
      }

      .card {
        width: 300px;
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

      .watch-button:hover {
        background-color: #0056b3;
      }

      @media screen and (min-width: 768px) {
        .title {
          text-align: left;
        }
      }
    `;

    return (
        <>
            <style>{styles}</style>
            <div className="title">Home Page</div>
            <Link to="/create-course" className="link">Create New Course</Link>
            <Grid container spacing={3} className="container">
                {courses.map(course => (
                    <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="card">
                            <CardContent className="card-content">
                                <Typography variant="h5" component="h2" className="card-title">
                                    {course.title}
                                </Typography>
                                <Typography color="textSecondary" className="rating">
                                    Rating: {course.rating}
                                </Typography>
                                <Typography variant="body2" component="p" className="description">
                                    {course.description}
                                </Typography>
                                <Button variant="contained" color="primary" href={course.videoUrl} target="_blank" className="watch-button">
                                    Watch Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default HomePage;
