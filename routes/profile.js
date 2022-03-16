//update profile
//get profile, add a key that states if it is your profile or someone elses

const express = require('express');
const secrets = require('../secrets.json');
const cookie_parser = require('cookie-parser');
const Users = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();
const dbError = {'error': 'Error connecting to database. Please contact admin.'};
const authError = {'error': 'Please login to perform the action'};
const jwt_secret = secrets[0].jwtKey;

router.use(cookie_parser());

router.get('/getProfile', (req, res) => {
    const search = req.query.user;
    const token = req.headers.jwt;
    if(search == 'self'){
        if(!token){
            res.status(400);
            res.json(authError);
        }
        else{
            jwt.verify(token, jwt_secret, (err, decodedToken)=>{
                Users.findOne({ _id : decodedToken.userID }, (err, doc) => {
                    if(err){
                        res.status(500);
                        res.json(dbError);
                    }
                    else{
                        if(!doc){
                            res.status(500);
                            res.json(dbError);
                        }
                        else{
                            res.status(200);
                            const reply = {
                                user: {
                                    username: doc.username,
                                    contactNumber: doc.contactNumber,
                                    email: doc.email,
                                    firstName: doc.firstName,
                                    lastName: doc.lastName,
                                    additionalInformation: doc.additionalInformation
                                },
                                isSelf: true
                            };  
                            res.json(reply)
                            
                        }
                    }
                });
            });
        }
    }
    else{
        Users.findOne({ username : search }, (err, doc) => {
            if(err){
                res.status(500);
                res.json(dbError);
            }
            else{
                if(!doc){
                    res.status(500);
                    res.json(dbError);
                }
                else{
                    res.status(200);
                    const reply = {
                        user: {
                            username: doc.username,
                            contactNumber: doc.contactNumber,
                            email: doc.email,
                            firstName: doc.firstName,
                            lastName: doc.lastName,
                            additionalInformation: doc.additionalInformation
                        },
                        isSelf: false
                    };  
                    res.json(reply)
                    
                }
            }
        });
    }
});

module.exports = router;