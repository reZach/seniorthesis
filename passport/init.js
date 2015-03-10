var login = require('./login');

module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users
    // to support persistent login sessions
    passport.serializeUser(function(user, done){    
        done(null, user);
    });
    
    passport.deserializeUser(function(obj, done){
        done(null, obj);
    });
    
    // Setting up Passport Strategies for Login and Signup/Registration
    login(passport);

};