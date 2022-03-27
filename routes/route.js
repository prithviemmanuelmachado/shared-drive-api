//create route
//get route

const express = require('express');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');
const Route = require('../models/route');

const router = express.Router();
const dbError = {'error': 'Error connecting to database. Please contact admin.'};
const authError = {'error' : 'Please login to perform action'};
const jwt_secret = secrets[0].jwtKey;

router.use(cookie_parser());

router.post('/createRoute', (req, res) => {
    const success = {'success': 'Route created successfully'};
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
                const newRoute = new Route({
                    createdBy: decodedToken.userID,
                    createdOn: Date.now(),
                    vehicle: body.vehicle,
                    noOfSeats: body.noOfSeats,
                    noOfAvailableSeats: body.noOfSeats,
                    timeOfDeparture: body.timeOfDeparture,
                    daysOfTravel: body.daysOfTravel,
                    fromLocation: body.fromLocation,
                    toLocation: body.toLocation
                });

                newRoute.save()
                .then(() => {
                    res.status(200);
                    res.json(success);
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