const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    createdBy: String,
    createdFor: String,
    createdOn: Date,
    type: String,
    body: Object,
    state: String
});

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;