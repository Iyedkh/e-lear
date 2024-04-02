import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

import './toprated.css';
const TopRatedCourses = () => {
    const [topRatedCourses, setTopRatedCourses] = useState([]);

    useEffect(() => {
        const fetchTopRatedCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/courses/courses/top-rated');
                if (response.ok) {
                    const data = await response.json();
                    setTopRatedCourses(data);
                } else {
                    console.error('Failed to fetch top-rated courses:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching top-rated courses:', error);
            }
        };

        fetchTopRatedCourses();
    }, []);

    
        

    return (
        <>
            
            
            <h2 className="text-center mb-4">Top Rated Courses</h2>
            <div className="containere">
                {topRatedCourses.map(course => (
                    <Card key={course._id} className="card">
                        <CardMedia
                            component="img"
                            height="140"
                            image={`http://localhost:3000${course.imageUrl}`}
                            alt={course.title}
                        />
                        <CardContent className="card-content">
                            <Typography gutterBottom variant="h5" component="div" className="card-title">
                                {course.title}
                            </Typography>
                            <Typography color="textSecondary" className="rating">
                                Rating: {course.rating}
                            </Typography>
                            <Typography variant="body2" component="p" className="description">
                                {course.description}
                            </Typography>
                            <div variant="contained" color="primary" href={course.videoUrl} target="_blank" className="watch-button">
                                Watch Now
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            
        </>
    );
};

export default TopRatedCourses;