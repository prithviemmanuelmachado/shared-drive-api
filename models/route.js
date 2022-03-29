const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    createdBy: String,
    createdOn: {
        type: Date,
        default: Date.now()
    },
    vehicle: String,
    noOfSeats: Number,
    noOfAvailableSeats: Number,
    timeOfDeparture: String,
    daysOfTravel: [String],
    fromLocation: {
        type: {
          type: String, 
          enum: ['Point'], 
        },
        coordinates: {
          type: [Number]
        },
        address: String
    },
    toLocation: {
        type: {
          type: String, 
          enum: ['Point'],
        },
        coordinates: {
          type: [Number]
        },
        address: String
    } 
});


const Route = mongoose.model('route', routeSchema);

module.exports = Route;