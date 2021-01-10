const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = require('./Comment');

const perspectiveSchema = new Schema(
    {
        displayName: {
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
            default: Date.now
            // consider function from deep-thoughts
        },
        comments: [{
                type: Schema.Types.ObjectId,
                ref: 'Perspective'
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