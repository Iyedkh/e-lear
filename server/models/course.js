// course.js

// Define the Course model
class Course {
    constructor(id, name, rating = 0, comments = []) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.comments = comments;
    }

    // Method to update course rating
    updateRating(newRating) {
        this.rating = newRating;
    }

    // Method to add comments to the course
    addComment(comment) {
        this.comments.push(comment);
    }
}

module.exports = Course;
