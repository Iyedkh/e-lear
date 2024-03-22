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
            justify-content: center;
            padding: 20px;
            margin-top: 20px;
        }

        .card {
            width: calc(100% - 20px);
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
            .card {
                width: calc(50% - 20px);
            }
        }

        @media screen and (min-width: 992px) {
            .card {
                width: calc(33.33% - 20px);
            }
        }
    `;

    return (
        <>
            <style>{styles}</style>
            <h2 className="text-center mb-4">Top Rated Courses</h2>
            <div className="container">
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

export default TopRatedCourses;
