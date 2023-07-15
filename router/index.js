const express = require('express');
const router = express.Router();
const homecontroler = require('../controller/home-controller');
const passport  = require('passport');

router.use('/user', require('./user'));

router.get('/', passport.checkAuthentication, homecontroler.Home)

module.exports = router;



// 812896215692-2orcnbmu8kovi2t3kdn6lrudqtbg95vu.apps.googleusercontent.com
// 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