const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    Name: String,
    Password: String
});

module.exports = mongoose.model('User', UserSchema);