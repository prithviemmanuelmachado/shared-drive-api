//register
//login user
//login admin
//is admin logged in

const bcrypt = require('bcrypt');
const express = require('express');
const settings = require('../settings.json'); 
const token = require('../models/token');
const Users = require('../models/user');
const Admins = require('../models/admin');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');

const router = express.Router();
const saltRounds = parseInt(settings.saltRounds);
const dbError = {'error': 'Error connecting to database. Please contact admin.'};
const jwt_secret = secrets.jwtKey;

router.use(cookie_parser());

router.post('/register', (req, res) =>{
    const userDetails = req.body;
    const success = {'success': 'User successfully created. Please login'};
    const contactError = {'error': 'These contacts are already in use. Please try other contacts'};
    const userError = {'error': 'Username exists. Please try another.'};
    Users.find({username: userDetails.username}, function(err, doc){
        if(err)
        {
            res.status(500);
            res.json(dbError);
        }
        else
        {
            if(doc.length == 0)
            {
                Users.find({$or: [
                    {contactNumber: userDetails.contactNumber},
                    {email: userDetails.email}
                ]}, function(err, doc){
                    if(err)
                    {
                        res.status(500);
                        res.json(dbError);
                    }
                    if(doc.length == 0)
                    {
                        bcrypt.hash(userDetails.password, saltRounds)
                        .then((hashedPassword) => {
                            const newUser = new Users({
                                firstName: userDetails.firstName,
                                lastName: userDetails.lastName,
                                username: userDetails.username,
                                password: hashedPassword,
                                email: userDetails.email,
                                contactNumber: userDetails.contactNumber,
                                additionalInformation: []
                            });
                            
                            newUser.save()
                            .then(() => {
                                res.status(200);
                                res.json(success);
                            })
                            .catch((err) => {
                                res.status(500);
                                res.json(dbError);
                            })
                        }); 
                    }
                    else
                    {
                        res.status(400);
                        res.json(contactError);
                    }
                });
            }
            else
            {
                res.status(400);
                res.json(userError);
            }
        }
    });
});

router.post('/userLogin', (req, res) => {
    const user = req.body;
    const userError = {'error' : 'Username does not exist'};
    const passError = {'error' : 'Password incorrect'};
    Users.findOne({username: user.username}, (err, doc) => {
        if(err){
            res.status(500);
            res.json(dbError);
        }
        else{
            if(!doc){
                res.status(400);
                res.json(userError);
            }
            else{
                bcrypt.compare(user.password, doc.password, (bErr, result) => {
                    if(bErr){
                        res.status(500);
                        res.json(dbError);
                    }
                    else{
                        if(result == true){
                            const jwtToken = token(doc._id, false);
                            res.status(200);
                            res.json({jwt: jwtToken});
                        }
                        else{
                            res.status(400);
                            res.json(passError);
                        }
                    }
                    
                });
                
            }
        }
    });
});

router.post('/adminLogin', (req, res) => {
    const user = req.body;
    const userError = {'error' : 'Admin not registerd with this email'};
    const passError = {'error' : 'Password incorrect'};
    Admins.findOne({email: user.email}, (err, doc) => {
        if(err){
            res.status(500);
            res.json(dbError);
        }
        else{
            if(!doc){
                res.status(400);
                res.json(userError);
            }
            else{
                bcrypt.compare(user.password, doc.password, (bErr, result) => {
                    if(bErr){
                        res.status(500);
                        res.json(dbError);
                    }
                    else{
                        if(result == true){
                            const jwtToken = token(doc._id, true);
                            res.status(200);
                            res.json({jwt: jwtToken});
                        }
                        else{
                            res.status(400);
                            res.json(passError);
                        }
                    }
                    
                });
                
            }
        }
    });
});

router.get('/isAdminLoggedIn', (req, res) => {
    const token = req.headers.jwt;
    if(token == 'undefined'){
        res.status(200);
        res.json(false);
    }
    else{
        jwt.verify(token, jwt_secret, (err, decodedToken)=>{
            if(err){
                res.status(400);
                res.json({"error" : "error"});
            }
            else{
                res.status(200);
                res.json(decodedToken.isAdmin);
            }
        });
    }
});

router.get('/getUsername', (req, res) => {
    const id = req.query.id;
    Users.findOne({_id: id}, (err, doc) => {
        if(err){
            res.status(500);
            res.json(dbError);
        }
        else{
            if(!doc){
                res.status(404);
                res.json(dbError);
            }
            else{
                res.status(200);
                res.json({'username': doc.username});
            }
        }
    });
});

module.exports = router;