var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/Users");
var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport){
    
    passport.use("login", new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
    
        // Check in mongo if user with username exists or not
        User.findOne({"username": username},
            function(err, user){
                
                // In case of any error, return using the done method
                if (err) {
                    return done(err);
                }
                
                // Username does not exist, log the error and redirect back
                if (!user) {
                
                    console.log("User not found with username: ", username);
                    return done(null, false, "User not found");
                }
                
                // User exists but wrong password, log the error
                if (!isValidPassword(user, password)){
                
                    console.log("Invalid password");
                    return done(null, false, "Invalid password");
                }
                
                // User and password both match, return user from
                // done method, which is treated like success
                return done(null, user);
            }
        );
    }));
    
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
};