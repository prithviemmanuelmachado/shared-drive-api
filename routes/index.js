const express = require('express');
const router = express.Router();

// const notification = require('./notification');
// const profile = require('./profile');
// const request = require('./request');
// const route = require('./route');
const user = require('./user');

// router.use('/notification', notification);
// router.use('/profile', profile);
// router.use('/request', request);
// router.use('/route', route);
router.use('/user', user);

module.exports = router;