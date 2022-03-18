const mongoose = require('mongoose');

const additionalInformationSchema = new mongoose.Schema({
    additionalInformation: String
});

const AdditionalInformation = mongoose.model('additionalInformation', additionalInformationSchema);

module.exports = AdditionalInformation;