const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    routeId: String,
    createdBy: String,
    createdOn: Date,
    pickupLocation: [Number],
    status: String,
    
});

const Request = mongoose.model('request', requestSchema);

module.exports = Request;