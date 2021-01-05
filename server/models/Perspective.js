const mongoose = require('mongoose');

const { Schema } = mongoose;

const perspectiveSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    security:{
        type: Schema.Types.ObjectId,
        ref: 'Security',
        required: true
    },
    comments: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
        }
    ],
    text:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Perspective = mongoose.model('Perspective', perspectiveSchema);

module.exports = Perspective