const mongoose = require('mongoose');
const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');

const commentSchema = require('./Comment');

const perspectiveSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        security:{
            type: String,
            required: true
        },
        text:{
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
            // borrowed function from deep-thoughts
        },
        comments: [{
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }]
    },
    {
        toJSON: {
          getters: true
        }
    }
);

const Perspective = mongoose.model('Perspective', perspectiveSchema);

module.exports = Perspective


// Consider leveraging the date Format from "deep-thoughts" project