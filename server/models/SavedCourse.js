const mongoose = require('mongoose');

const SavedCourseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
});

const SavedCourse = mongoose.model('SavedCourse', SavedCourseSchema);

module.exports = SavedCourse;
