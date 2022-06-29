//create request
//set request status

const express = require('express');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');
const settings = require('../settings.json');
const Request = require('../models/request');
const User = require('../models/user');
const Route = require('../models/route');
const notification = require('../models/notificationService');

const router = express.Router();
const dbError = {'error': 'Error connecting to database. Please contact admin.'};
const authError = {'error' : 'Please login to perform action'};
const jwt_secret = secrets.jwtKey;

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

router.get('/getPickupLocation', (req, res) => {
    const id = req.query.id;
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
                Request.findOne({_id: id}, (err, doc) => {
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
                            res.status(200);
                            res.json({loc: doc.pickupLocation});
                        }
                    }
                });
            }
        });
    }
    
});

router.put('/setRequestStatus', (req, res) => {
    const status = req.query.status;
    const id = req.query.id;
    const notifId = req.query.notifId;
    const token = req.headers.jwt;
    const createdFor = req.query.createdFor;

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
                Request.findOneAndUpdate({_id: id}, { $set : {
                    status: status
                }}, (err, doc, re) => {
                    if(err){
                        res.status(500);
                        res.json(dbError);
                    }
                });
                if(status === 'accepted'){
                    Route.findByIdAndUpdate(doc.routeId, 
                        {$inc: { noOfAvailableSeats: -1 }}, 
                        (err, doc) => {
                            if(err){
                                res.status(500);
                                res.json(dbError);
                            }
                    });
                }
                notification.setInactive(notifId, () => {
                    notification.create({
                        createdBy: decodedToken.userID,
                        createdFor: createdFor,
                        type: 'status',
                        body: status
                    }, () => {
                        res.status(200);
                        res.json({'success' : 'Request has been '+status});
                    }, () => {
                        res.status(400);
                        res.json(dbError);
                    });
                }, () => {
                    res.status(400);
                    res.json(dbError);
                });             
            }
        });
    }
});

router.get('/', (req, res) => {
    res.json('Working');
});

module.exports = router;