const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ChatSchema = new Schema({
    Name: {type: String, required: true},
    //ID: {type: String, required: true},
    Members: [String]
})
module.exports = mongoose.model('Chat', ChatSchema);