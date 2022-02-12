const bcrypt = require('bcrypt');
const express = require('express');
const settings = require('../settings.json'); 
const token = require('../models/token');
const Users = require('../models/user');

const router = express.Router();
const saltRounds = parseInt(settings[0].saltRounds);

router.post('/register', (req, res) =>{
    const userDetails = req.body;
    const dbError = {'error': 'Error connecting to database. Please contact admin.'};
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
                ]}, async function(err, doc){
                    if(err)
                    {
                        res.status(500);
                        res.json(dbError);
                    }
                    if(doc.length == 0)
                    {
                        const hashedPassword = await bcrypt.hash('red', saltRounds);

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


module.exports = router;