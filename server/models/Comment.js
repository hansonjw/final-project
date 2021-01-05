const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    commentDate: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    },
    writtenBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;