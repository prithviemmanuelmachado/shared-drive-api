const express = require('express');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');
const AdditionalInformation = require('../models/additonalInformation');

const router = express.Router();
const dbError = {'error': 'Error connecting to database. Please contact admin.'};
const authError = {'error' : 'Please login to perform action'};
const adminError = {'error' : 'You are not authorized to perform this action'};
const jwt_secret = secrets[0].jwtKey;

router.use(cookie_parser());

router.get('/listOfAdditionalInformation', (req, res) => {
    const token = req.headers.jwt;
    if(!token){
        res.status(400);
        res.json(authError);
    }
    else{
        AdditionalInformation.find({}, (err, doc) => {
            if(err){
                res.status(500);
                res.json(dbError);
            }
            else{
                res.status(200);
                res.json(doc);
            }
        })
    }
});

router.post('/newAdditionalInformation', (req, res) => {
    const token = req.headers.jwt;
    const body = req.body;
    const success = {'success': 'Additional information added'};
    if(!token){
        res.status(400);
        res.json(authError);
    }
    else{
        jwt.verify(token, jwt_secret, (err, decodedToken)=>{
            if(err){
                res.status(500);
                res.json(dbError);
            }
            else{
                if(decodedToken.isAdmin === false){
                    res.status(400);
                    res.json(adminError);
                }
                else{
                    const newAdditionalInformation = new AdditionalInformation({
                        additionalInformation: body.additionalInformation
                    });

                    newAdditionalInformation.save()
                    .then(() => {
                        res.status(200);
                        res.json(success);
                    }).catch((err) => {
                        res.status(500);
                        res.json(dbError);
                    });
                }
            }
        });
    }
});

router.delete('/removeInformation', (req, res) => {
    const id = req.query.id;
    if(!token){
        res.status(400);
        res.json(authError);
    }
    else{
        jwt.verify(token, jwt_secret, (err, decodedToken)=>{
            if(err){
                res.status(500);
                res.json(dbError);
            }
            else{
                if(decodedToken.isAdmin === false){
                    res.status(400);
                    res.json(adminError);
                }
                else{
                    AdditionalInformation.findByIdAndDelete(id, (err, doc) => {
                        if (err){
                            res.status(500);
                            res.json(dbError);
                        }
                        else{
                            res.status(200);
                            res.json({'success': 'Entry successfully deleted'});
                        }
                    });
                }
            }
        });
    }
    
});

module.exports = router;