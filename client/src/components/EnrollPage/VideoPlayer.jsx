import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoPlayer = ({ courseId }) => {
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/courses/${courseId}`);
                if (response.status === 200) {
                    setVideoUrl(response.data.videoUrl);
                } else {
                    console.error('Failed to fetch video URL:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };

        if (courseId) {
            fetchVideoUrl();
        }
    }, [courseId]);

    return (
        <div className="video-player">
            {videoUrl ? (
                <video controls>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Loading video...</p>
            )}
        </div>
    );
};

export default VideoPlayer;
