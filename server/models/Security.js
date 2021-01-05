const mongoose = require('mongoose');

const { Schema } = mongoose;

const securitySchema = new Schema({
    ticker:{
        type: String,
        required: true,
        trim: true
    },
    name:{
        type: String,
        trim: true
    }
});

const Security = mongoose.model('Security', securitySchema);

module.exports = Security;