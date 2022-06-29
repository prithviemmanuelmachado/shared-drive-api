const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');
const settings = require('../settings.json');

const key = secrets.jwtKey;
const jwtExpiresIn = settings.jwtExpiresIn;

module.exports = function(userID, isAdmin){
    return jwt.sign({
        userID: userID,
        isAdmin: isAdmin
    }, key, {
        expiresIn: jwtExpiresIn
    });
}
