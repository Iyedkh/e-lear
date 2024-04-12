import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import Sidebar from './Sidebar';
import CommentForm from './CommentForm';
import './EnrollPage.css';

const EnrollPage = ({ courseId }) => {
    const [course, setCourse] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/courses/${courseId}`);
                if (response.status === 200) {
                    setCourse(response.data);
                    setVideoUrl(response.data.videoUrl); // Set the video URL
                } else {
                    console.error('Failed to fetch course details:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    return (
        <div className="enroll-page">
            <div className="video-player">
                {videoUrl && <VideoPlayer videoUrl={videoUrl} />} {/* Render the video player with the fetched video URL */}
            </div>
            <div className="sidebar">
                {course && <Sidebar courseId={courseId} courseTitle={course.title} />} {/* Pass other course details to the Sidebar component */}
            </div>
            <div className="comment-form">
                <CommentForm courseId={courseId} />
            </div>
        </div>
    );
};

export default EnrollPage;
