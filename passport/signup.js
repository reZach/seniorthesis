var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/Users");
var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport){

    passport.use("signup", new LocalStrategy({
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done){
    
        findOrCreateUser = function(){
        
            // Find a user in mongo with provided username
            User.findOne({"username": username}, function(err, user){
            
                // In case of any error, return using the done method
                if (err){
                    
                    console.log("Error in signup:", err);
                    return done(err);
                }
                
                // Already exists
                if (user) {
                
                    console.log("User already exists with username", username);
                    return done(null, false, "User already exists");
                } else {
                
                    // If there is no user with that email
                    // Create the email
                    var newUser = new User();
                    
                    // Set the user's credentials
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.param("email");
                    
                    // Save the user
                    newUser.save(function(err) {
                    
                        if (err) {
                        
                            console.log("Error in saving user: ", err);
                            throw err;
                        }
                        
                        console.log("User registration succesful");
                        return done(null, newUser);
                    });
                }
            });
        };
        
        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }));
    
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
};