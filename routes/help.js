//create a query
//get all unclaimed queries and queires claimed by the user
//claim a query
//resolve a query

const express = require('express');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');
const Help = require('../models/help');
const notification = require('../models/notificationService');

const router = express.Router();
const dbError = {'error': 'Error connecting to database. Please contact admin.'};
const authError = {'error' : 'Please login to perform action'};
const notAuthorized = {'error' : 'You are not authorized to perform this action'};
const jwt_secret = secrets.jwtKey;

router.use(cookie_parser());

router.post('/createQuery', (req, res) => {
    const token = req.headers.jwt;
    const body = req.body;
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
                const newHelp = new Help({
                    createdBy: decodedToken.userID,
                    createdOn: Date.now(),
                    body: body.body,
                    state: 'unclaimed',
                    solution: ''
                });

                newHelp.save()
                .then(() => {
                    res.status(200);
                    res.json({'success' : 'Query created'});
                })
                .catch((err) => {
                    res.status(500);
                    res.json(dbError);
                })
            }
        });
    }
});

router.get('/getQueries', (req, res) => {
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
                if(!decodedToken.isAdmin){
                    res.status(400);
                    res.json(notAuthorized);
                }
                else{
                    Help.find({
                        $or:[
                            {state: 'unclaimed'},
                            {state: decodedToken.userID}
                        ]
                    }, (err, doc) => {
                        if(err){
                            res.status(500);
                            res.json(dbError);
                        }
                        else{
                            res.status(200);
                            res.json(doc);
                        }
                    });
                }
            }
        });
    }
});

router.put('/claimQuery', (req, res) => {
    const token = req.headers.jwt;
    const id = req.query.id;
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
                if(!decodedToken.isAdmin){
                    res.status(400);
                    res.json(notAuthorized);
                }
                else{
                    Help.findOne({_id: id}, (err, doc) => {
                        if(err){
                            res.status(500);
                            res.json(dbError);
                        }
                        else{
                            if(doc.status !== 'unclaimed'){
                                Help.findOneAndUpdate(
                                    {_id: id}, 
                                    { $set: {
                                        state: decodedToken.userID
                                    }},
                                    (err, doc) => {
                                        if(err){
                                            res.status(500);
                                            res.json(dbError);
                                        }
                                        else{
                                            res.status(200);
                                            res.json({'success': 'Query calimed'});
                                        }
                                    }
                                );
                            }
                            else{
                                res.status(200);
                                res.json({'error': 'Query is already claimed'});
                            }
                        }
                    });
                }
            }
        });
    }
});

router.put('/resolveQuery', (req, res) => {
    const token = req.headers.jwt;
    const body = req.body;
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
                if(!decodedToken.isAdmin){
                    res.status(400);
                    res.json(notAuthorized);
                }
                else{
                    Help.findOneAndUpdate(
                        {_id: body.id}, 
                        { $set: {
                            state: 'resolved',
                            solution: body.solution
                        }},
                        (err, doc) => {
                            if(err){
                                res.status(500);
                                res.json(dbError);
                            }
                            else{
                                const notificationBody = {
                                    createdBy: decodedToken.userID,
                                    createdFor: body.createdFor,
                                    type: 'reply',
                                    body: 'Admin replied to your query "' + doc.body +'" saying "' + body.solution + '"'
                                };
                                notification.create(notificationBody, () => {
                                    res.status(200);
                                    res.json({'success': 'Query Resolved'});
                                }, () => {
                                    res.status(500);
                                    res.json(dbError);
                                });
                                
                            }
                        }
                    );
                }
            }
        });
    }
});

module.exports = router;