// RatingComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const RatingComponent = ({ courseId }) => {
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
    <div>
      <h6>Ratings</h6>
      <p>Average Rating: {averageRating.toFixed(2)} Stars</p>
      <ul>
        {ratings.map((rating) => (
          <li key={rating._id}>{rating.stars} Stars</li>
        ))}
      </ul>
    </div>
  );
};

export default RatingComponent;
