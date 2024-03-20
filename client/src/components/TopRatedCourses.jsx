import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

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

    const styles = `
        .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 20px;
            margin-top: 20px;
        }

        .card {
            width: calc(33.33% - 20px);
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
    `;

    return (
        <>
            <style>{styles}</style>
            <div className="container">
                {topRatedCourses.map(course => (
                    <Card>
                    <CardMedia
                        component="img"
                        height="140"
                        image={course.imageUrl} // Display the course image
                        alt={course.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {course.title}
                        </Typography>
                        <Typography color="textSecondary">
                            Rating: {course.rating}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {course.description}
                        </Typography>
                        <Button variant="contained" color="primary" href={course.videoUrl} target="_blank">
                            Watch Now
                        </Button>
                    </CardContent>
                </Card>
                ))}
            </div>
        </>
    );
};

export default TopRatedCourses;
