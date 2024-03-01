// middleware/filterMiddleware.js
const Course = require('../models/course');

const filterMiddleware = async (req, res, next) => {
  const { category } = req.query;

  if (category) {
    try {
      const courses = await Course.find({ category });
      res.json(courses);
    } catch (error) {
      console.error('Error filtering courses:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    next(); // Continue to the next middleware or route handler
  }
};

module.exports = filterMiddleware;
