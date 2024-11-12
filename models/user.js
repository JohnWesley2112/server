const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        // select: false,
        minlength: 8
    },
    profile_pic: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('quick-chat-users', userScheme);