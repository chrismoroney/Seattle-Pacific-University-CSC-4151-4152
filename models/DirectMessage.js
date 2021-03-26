const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let DirectMessageSchema = new Schema({
    Sender: {type: String, required: true},
    Message: {type: String, required: true},
    ChatID: {type: String, required: true},
});

module.exports = mongoose.model('DirectMessage', DirectMessageSchema);