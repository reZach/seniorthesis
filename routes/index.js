var express = require('express');
var router = express.Router();
var User = require('./../models/user');

function ensureAuthenticated(req, res) {
  if (req.isAuthenticated()) { return true; }
  return false;
}

// Routes
module.exports = function(passport){

    // Home
    router.get("/", function(req, res){
    
        res.render("index", {title: "Express"});
    });
    
    // Google authenticate
    router.get('/auth/google',
        passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' })
    );
    
    // Google calls this url after trying to authenticate
    router.get('/auth/google_oauth2/callback',
        passport.authenticate('google'),
        function(req, res) {  
            res.redirect('/');
        }
    );
    
    // Logout
    router.get('/logout', function(req, res){    
        req.logout();
        res.redirect('/');
    });
    
    // Me
    router.get('/getme', function(req, res){
        if (req.isAuthenticated()){
            return res.json(req.user);
        }
        
        return res.status(409).json({});
    });

    router.post('/update', function(req, res) {
        
        if (req.isAuthenticated()){
        
            var user = req.user;
            var activities = req.body;
            
            res.send(activities);
            
            User.findOne({
                'googleId': user.googleId
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                
                // No user was found
                if (user) {
                    
                    console.log("activities -->", activities);
                    user.data = activities;
                    
                    user.save(function(err){
                        if (err) {
                            console.log(err);
                        }
                        
                        console.log('User information updated');
                    });
                } else {
                    console.log('User was not found');
                }
            });
        
        
        } else {
            console.log("Could not save user");            
        }
    });
    
    return router;
}