
var Secrets = require('../secretkeys');
var User = require('../models/user');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport){
    
    // Google login
    passport.use(new GoogleStrategy({ 
        clientID: Secrets.clientID,
        clientSecret: Secrets.clientSecret,
        callbackURL: 'http://127.0.0.1:3000/auth/google_oauth2/callback'
    }, function(accessToken, refreshToken, profile, done) {

        // Problem here? 
        User.findOne({
            'googleId': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            
            // No user was found
            if (!user) {
                user = new User({
                    googleId: profile.id,
                    name: profile.displayName
                });
                
                user.save(function(err){
                    if (err) {
                        console.log(err);
                    }
                    console.log("created user");
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }));
};