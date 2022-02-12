const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');
const settings = require('../settings.json');

const key = secrets[0].jwtKey;
const jwtExpiresIn = settings[0].jwtExpiresIn;

module.exports = function(userID){
    return jwt.sign({
        userID: userID
    }, key, {
        expiresIn: jwtExpiresIn
    });
}
