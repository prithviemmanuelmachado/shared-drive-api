const mongoose = require('mongoose');

const helpSchema = new mongoose.Schema({
    createdBy: String,
    createdOn: Date,
    body: String,
    state: String,
    solution: String
});

const Help = mongoose.model('help', helpSchema);

module.exports = Help;