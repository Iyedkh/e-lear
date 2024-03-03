const mongoose = require('mongoose');

const communityChapterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const CommunityChapter = mongoose.model('CommunityChapter', communityChapterSchema);

module.exports = CommunityChapter;
