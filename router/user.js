const express = require('express');
const router = express.Router();
const usercontroler = require('../controller/user-controller');
const passport = require('passport');

router.get('/signin', usercontroler.Signin);
router.get('/signup', usercontroler.Signup);
router.post('/create', usercontroler.Create);
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect: 'back'},
 ) , usercontroler.createsession);

router.get('/forgetpassword',usercontroler.Forgetpassword);
router.post('/updatepassword', usercontroler.sendemailfoegetpasword);
router.get('/updatepassword1/:id', usercontroler.UpdatePassword);
router.post('/updatepassword12', usercontroler.UpdatePassword1);
router.get('/signout', usercontroler.destroyession);
router.get('/resetpassword', usercontroler.resetpassword);

 
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/sginin'}), usercontroler.createsession);


module.exports = router;