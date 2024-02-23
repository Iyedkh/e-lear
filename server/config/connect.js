const mongoose = require('mongoose');

// MongoDB connection URL
mongoose.connect('mongodb://127.0.0.1:27017/e_learn')
    .then(
        ()=>{
        console.log('Connected to MongoDB');
        }
    ) 
    .catch(
    (err) =>{
        console.log( err);
    } 
    )

module.exports = mongoose;
