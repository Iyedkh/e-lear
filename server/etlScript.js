const CourseModel = require('./models/course');
const CommentModel = require('./models/comment');
const CategoryModel = require('./models/Category');
const QuizModel = require('./models/Quiz');
const UserModel = require('./models/User');

// Define transformation functions (existing functions remain unchanged)
function transformCourses(courses) {
    return courses.map(course => ({
        id: course._id,
        title: course.title,
        description: course.description,
        category: course.category,
        videoUrl: course.videoUrl,
        imageUrl: course.imageUrl
    }));
}



function transformComments(comments) {
    return comments.map(comment => ({
        id: comment._id,
        courseId: comment.courseId,
        content: comment.content,
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
    }));
}

function transformQuizzes(quizzes) {
    return quizzes.map(quiz => ({
        id: quiz._id,
        title: quiz.title,
        questions: quiz.questions
       
    }));
}

function transformUsers(users) {
    return users.map(user => ({
        id: user._id,
        email: user.email,
        username: user.username,
        city: user.city,
        role: user.role,
        registrationDate: user.registrationDate 
        
    }));
}

// Define the etl function to perform ETL
async function etl() {
    try {
        // Extract data from MongoDB
        const [courses, comments, categories, quizzes, users] = await Promise.all([
            CourseModel.find(),
            CommentModel.find(),
            CategoryModel.find(),
            QuizModel.find(),
            UserModel.find()
        ]);

        // Check if data is extracted successfully
        if (!courses || !comments || !categories || !quizzes || !users) {
            throw new Error('Data not found');
        }

        // Transform data
        const transformedCourses = transformCourses(courses);
        const transformedComments = transformComments(comments);
        const transformedCommentsByCourse = transformCommentsByCourse(comments);
        const transformedCategories = transformCategories(categories);
        const transformedQuizzes = transformQuizzes(quizzes);
        const transformedUsers = transformUsers(users);

        // Return the transformed data with counts
        return {
            courses: transformedCourses,
            comments: transformedComments,
            commentsByCourse: transformedCommentsByCourse,
            categories: transformedCategories,
            quizzes: transformedQuizzes,
            users: transformedUsers,
            counts: {
                userCount: users.length,
                courseCount: courses.length,
                categoryCount: categories.length
            }
        };

    } catch (error) {
        console.error('Error performing ETL:', error);
        throw error;
    }
}

// Export the etl function
module.exports = { etl };
