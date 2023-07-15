let mongoose = require('mongoose');
let userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    token:{
        type: String
    }
});

let User = mongoose.model('User', userschema)
module.exports = User;