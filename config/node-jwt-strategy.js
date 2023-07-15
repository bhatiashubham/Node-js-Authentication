const passport = require('passport');
let JwtStrategy = require('passport-jwt').Strategy;
let  ExtractJwt = require('passport-jwt').ExtractJwt;

let User = require('../models/user');
const { isErrored } = require('stream');

let opts= {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial'
}

passport.use(new JwtStrategy(opts, function(jwtpayload, done) {
    User.findOne({id: jwtpayload._id}, function(err, user) {
        if (err) {
            console.log('error in finding jwt user', err)
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports=passport;