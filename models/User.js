const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    confirmpassword: String
});

module.exports = mongoose.model('User', UserSchema);