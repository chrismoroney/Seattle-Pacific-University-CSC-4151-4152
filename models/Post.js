const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PostSchema = new Schema({
    Name: {type: String, required: true},
    Body: {type: String, required: true}
});

module.exports = mongoose.model('Post', PostSchema);