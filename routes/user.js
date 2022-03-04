//register
//login user
//login admin

const bcrypt = require('bcrypt');
const express = require('express');
const settings = require('../settings.json'); 
const token = require('../models/token');
const Users = require('../models/user');
const cookie_parser = require('cookie-parser');

const router = express.Router();
const saltRounds = parseInt(settings[0].saltRounds);
const dbError = {'error': 'Error connecting to database. Please contact admin.'};

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
    const success = {'success' : 'Login successful'};
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

module.exports = router;