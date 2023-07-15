let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

let User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    async function(req, email, password, done){


        let user = await User.findOne({email: email});
        
            if( !user || user.password != password){
                console.log('invalid  User/password');
                
                // req.flash('error', 'invalid  User/password');
                
                return done(null, false);
            }
            return done(null, user);
        })
    
);

//serializing the user to diside which kye to be in kept in the cookice
passport.serializeUser(function(user, done){
    done(null, user.id)
})

//// deserializing the user to diside which kye to be in kept in the cookice
passport.deserializeUser(function (id, done) {
    User.findById(id)
      .then((user) => {
        return done(null, user);
      })
      .catch((e) => {
        return done(e);
      });
  });

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/user/signin')
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    
    next();
}

module.exports = passport;