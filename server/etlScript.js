// Import necessary modules and dependencies
const CourseModel = require('./models/course');
const CommentModel = require('./models/comment');
const CategoryModel = require('./models/Category');
const QuizModel = require('./models/Quiz');

// Define transformation functions
function transformCourses(courses) {
    return courses.map(course => ({
        id: course._id,
        title: course.title,
        averageRating: calculateAverageRating(course.ratings), // Calculate average rating
        description: course.description,
        category: course.category,
        videoUrl: course.videoUrl,
        imageUrl: course.imageUrl
        // Add more transformations as needed
    }));
}

function calculateAverageRating(ratings) {
    if (!ratings || ratings.length === 0) {
        return 0;
    }

    const totalRating = ratings.reduce((acc, curr) => acc + curr.stars, 0);
    return totalRating / ratings.length;
}

function transformComments(comments) {
    return comments.map(comment => ({
        id: comment._id,
        courseId: comment.courseId,
        content: comment.content,
        // Add more transformations as needed
    }));
}

function transformCommentsByCourse(comments) {
    // Group comments by courseId and count the number of comments for each course
    const commentsByCourse = comments.reduce((acc, comment) => {
        acc[comment.courseId] = acc[comment.courseId] || 0;
        acc[comment.courseId]++;
        return acc;
    }, {});

    // Transform the data into an array of objects with courseId and commentCount
    return Object.entries(commentsByCourse).map(([courseId, commentCount]) => ({
        courseId,
        commentCount
    }));
}

function transformCategories(categories) {
    return categories.map(category => ({
        id: category._id,
        name: category.name,
        description: category.description,
        image: category.image
        // Add more transformations as needed
    }));
}

function transformQuizzes(quizzes) {
    return quizzes.map(quiz => ({
        id: quiz._id,
        title: quiz.title,
        questions: quiz.questions
        // Add more transformations as needed
    }));
}

// Define the etl function to perform ETL
async function etl() {
    try {
        // Extract data from MongoDB
        const [courses, comments, categories, quizzes] = await Promise.all([
            CourseModel.find(),
            CommentModel.find(),
            CategoryModel.find(),
            QuizModel.find()
        ]);

        // Check if data is extracted successfully
        if (!courses || !comments || !categories || !quizzes) {
            throw new Error('Data not found');
        }

        // Transform data
        const transformedCourses = transformCourses(courses);
        const transformedComments = transformComments(comments);
        const transformedCommentsByCourse = transformCommentsByCourse(comments);
        const transformedCategories = transformCategories(categories);
        const transformedQuizzes = transformQuizzes(quizzes);

        // Return the transformed data
        return {
            courses: transformedCourses,
            comments: transformedComments,
            commentsByCourse: transformedCommentsByCourse,
            categories: transformedCategories,
            quizzes: transformedQuizzes
        };

    } catch (error) {
        console.error('Error performing ETL:', error);
        throw error;
    }
}

// Export the etl function
module.exports = { etl };
