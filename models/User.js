const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    confirmpassword: String
});

module.exports = mongoose.model('User', UserSchema);