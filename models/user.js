const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    contactNumber: String,
    email: String,
    username: String,
    password: String,
    additionalInformation: [{
        key: String, 
        value: String
    }]
});

const Users = mongoose.model('user', userSchema);

module.exports = Users;