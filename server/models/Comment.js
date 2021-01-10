const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    commentDate: {
        type: Date,
        default: Date.now
    },
    commentText: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;