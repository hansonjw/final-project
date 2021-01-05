const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = rqeuire('bcrypt');

// require other models??
const Perspective = require('./Perspective');
const Comment = require('./Comment');


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    perspectives: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Perspective'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

// hash pasasworld using bcrypt
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// compare incoming password with hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return await bycrypt.compare(password, this.password);
};

// create the user model suing the userSchema
const User = mongoose.model('User', userSchema);

// export the model
module.exports = User;