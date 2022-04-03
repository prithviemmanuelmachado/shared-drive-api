//create request
//set request status

const express = require('express');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');
const settings = require('../settings.json');
const Request = require('../models/request');
const User = require('../models/user');
const notification = require('../models/createNotification');

const router = express.Router();
const dbError = {'error': 'Error connecting to database. Please contact admin.'};
const authError = {'error' : 'Please login to perform action'};
const jwt_secret = secrets[0].jwtKey;
const selfURI = settings[0].serverURI;

router.use(cookie_parser());

router.post('/createRequest', (req, res) => {
    const success = {'success': 'Request has been sent. Please wait for response'};
    const body = req.body;
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
                const newRequest = new Request({
                    routeId: body.routeId,
                    createdBy: decodedToken.userID,
                    createdOn: Date.now(),
                    pickupLocation: [body.lng, body.lat],
                    status: 'Pending',
                });

                newRequest.save()
                .then(() => {
                    User.findOne({username: body.author}, (err, doc) => {
                        if(err){
                            res.status(500);
                            res.json(dbError);
                        }
                        else{
                            if(!doc){
                                res.status(400);
                                res.json(dbError);
                            }
                            else{
                                const notificationBody = {
                                    createdBy: decodedToken.userID,
                                    createdFor: doc._id,
                                    type: 'request',
                                    body: newRequest._id
                                };
                                notification.create(notificationBody, () => {
                                    res.status(200);
                                    res.json(success);
                                }, () => {
                                    res.status(400);
                                    res.json(dbError);
                                });  
                            }
                        }
                    });    
                })
                .catch((err) => {
                    res.status(500);
                    res.json(dbError);
                });
            }
        });
    }
});

module.exports = router;