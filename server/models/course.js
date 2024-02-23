// course.js

class Course {
    constructor(id, title, rating = 0, comments = []) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.comments = comments;
    }

    // Methods to update course rating and add comments
    updateRating(newRating) {
        this.rating = newRating;
    }

    addComment(comment) {
        this.comments.push(comment);
    }
}

module.exports = Course;
