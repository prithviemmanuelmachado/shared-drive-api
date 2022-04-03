//create route
//get route

const express = require('express');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');
const Route = require('../models/route');
const User = require('../models/user');

const router = express.Router();
const dbError = {'error': 'Error connecting to database. Please contact admin.'};
const authError = {'error' : 'Please login to perform action'};
const routeError = {'error' : 'No routes found'};
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
                User.findOne({_id: decodedToken.userID}, (err, doc) => {
                    if(err){
                        res.status(500);
                        res.json(dbError);
                    }
                    else{
                        if(!doc){
                            res.status(400);
                            res.json(authError);
                        }
                        else{
                            const newRoute = new Route({
                                createdBy: doc.username,
                                createdOn: Date.now(),
                                vehicle: body.vehicle,
                                noOfSeats: body.noOfSeats,
                                noOfAvailableSeats: (body.noOfSeats - 1),
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
                    }
                });                         
            }
        });
    }
});

router.get('/getRoutesByProximity', (req, res) => {
    const token = req.headers.jwt;
    let routes = [];
    const coords = [parseFloat(req.query.lng), parseFloat(req.query.lat)];
    //to location
    Route.aggregate([
        {
            "$geoNear": {
                "near":{
                    "type": "Point",
                    "coordinates": coords
                },
                "distanceField": "distance",
                "spherical": true,
                "distanceMultiplier": 0.001,
                "maxDistance": 10000,
                "key": "toLocation" 
            }
        }
    ], (err, doc) => {
        if(err){
            res.status(500);
            res.json(dbError);
            console.log(err);
        }
        else{
            if(doc.length === 0){
                res.status(400);
                res.json(routeError);
            }
            else{
                routes = doc;
                //from location
                Route.aggregate([
                    {
                        "$geoNear": {
                            "near":{
                                "type": "Point",
                                "coordinates": coords
                            },
                            "distanceField": "distance",
                            "spherical": true,
                            "distanceMultiplier": 0.001,
                            "maxDistance": 10000,
                            "key": "fromLocation" 
                        }
                    }
                ], (err, doc) => {
                    if(err){
                        res.status(500);
                        res.json(dbError);
                        console.log(err);
                    }
                    else{
                        if(doc.length === 0){
                            res.status(400);
                            res.json(routeError);
                        }
                        else{
                            let isInArray = false;
                            for(let i = 0; i < doc.length; i ++){
                                isInArray = false;
                                for(let j = 0 ;j < routes.length; j++){
                                    if(doc[i]._id.equals(routes[j]._id)){
                                        isInArray = true;
                                        break;
                                    }
                                }
                                if(!isInArray){
                                    routes.push(doc[i]);
                                }
                            }

                            //sort by distance
                            routes.sort((a, b) => {
                                return a.distance - b.distance;
                            });

                            //if not logged in jst send the rouets
                            //if logged in remove the users routes and then send it
                            if(token == 'undefined'){
                                res.status(200);
                                res.json(routes);
                            }
                            else{
                                jwt.verify(token, jwt_secret, (err, decodedToken)=>{
                                    if(err){
                                        res.status(200);
                                        res.json(routes);
                                    }
                                    else{
                                        User.findOne({_id: decodedToken.userID}, (err, doc) => {
                                            if(err){
                                                res.status(500);
                                                res.json(dbError);
                                            }
                                            else{
                                                if(!doc){
                                                    res.status(400);
                                                    res.json(authError);
                                                }
                                                else{
                                                    const username = doc.username;    
                                                    routes.forEach((element, index) => {
                                                        if(element.createdBy === username){
                                                            routes.splice(index, 1);
                                                        }
                                                    });
                                                }
                                                res.status(200);
                                                res.json(routes);
                                            }
                                        });                         
                                    }
                                });
                            } 
                        }
                    }
                });

                
            }
        }
    });

    
});

module.exports = router;