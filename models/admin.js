const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const Admins = mongoose.model('admin', adminSchema);

module.exports = Admins;