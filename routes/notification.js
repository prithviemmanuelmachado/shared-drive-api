//create notifications
//get notifications

const express = require('express');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');
const Notification = require('../models/notification');

const router = express.Router();
const dbError = {'error': 'Error connecting to database. Please contact admin.'};
const authError = {'error' : 'Please login to perform action'};
const jwt_secret = secrets.jwtKey;

router.use(cookie_parser());

router.get('/getNotifications', (req, res) => {
    const token = req.headers.jwt;
    if(token == 'undefined'){
        res.status(400);
        res.json(authError);
    }
    else{
        jwt.verify(token, jwt_secret, (err, decodedToken)=>{
            if(err){
                res.status(400);
                res.json(dbError);
            }
            else{
                Notification.find({$and:  [
                    {createdFor : decodedToken.userID},
                    {state: 'active'} 
                ]}, (err, doc) => {
                    if(err){
                        res.status(400);
                        res.json(dbError);
                    }
                    else{
                        res.status(200);
                        res.json(doc);
                    }
                });
            }
        });
    }
});

module.exports = router;