const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    Name: {type: String, required: true},
    Message: {type: String, required: true}
});

module.exports = mongoose.model('Message', MessageSchema);