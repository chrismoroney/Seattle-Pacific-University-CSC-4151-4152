const mongoose = require('mongoose');
let User = require('../models/User.js');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    confirmpassword: String,
    bio: String,
    langExp: [String],
    langLearn: [String],
    onlineStatus: Boolean,
    friends: [String],
    blocked: [String],
    blocking: [String],
    blockedBy: [String]
});

module.exports = mongoose.model('User', UserSchema);