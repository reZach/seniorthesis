
var User = require('../models/user');
var GoogleStrategy = require('passport-google').Strategy;

module.exports = function(passport){
    
    // Google login
    passport.use(new GoogleStrategy({    
        returnURL: 'http://localhost:3000/auth/google/return',
        realm: 'http://localhost:3000'
    }, function(identifier, profile, done) {
            
        User.findOrCreate({ openId: identifier }, function(err, user) {
            
            done(err, user);
        });
    }));
};