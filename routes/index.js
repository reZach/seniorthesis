var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var Data = require('./../models/data');
var Activity = require('./../models/activity');

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
        
        return res.status(400).json({});
    });

    router.post('/update', function(req, res) {
        
        if (req.isAuthenticated()){
        
            var user = req.user;
            var activities = req.body;
            
            
            console.log(activities);
            res.send(activities);
            
            User.findOne({
                'googleId': user.googleId
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                
                // No user was found
                /*
                if (user) {
                    
                    console.log("activities -->", activities);
                    
                    for (var i = 0; i < activities.data.length; i++){ // Loop through activities
                    
                        var singleActivity = new Activity({
                            name: activities[i].name,
                            data: []
                        });
                                                
                        var dataArray = [];
                        
                        for (var j = 0; j < singleActivity.data.length; j++){ // Loop through data
                   
                            var data = new Data({
                                date: singleActivity.data[j].date,
                                time: singleActivity.data[j].time,
                                timestamp: singleActivity.data[j].timestamp
                            });
                            
                            singleActivity.data.push(data);
                        }
                        
                        singleActivity.data = dataArray;
                        
                        user.data.push(singleActivity);
                    }
                    
                    user.save(function(err){
                        if (err) {
                            console.log(err);
                        }
                        
                        console.log('User information updated');
                    });
                } else {
                    console.log('User was not found');
                }*/
            });
        
        
        } else {
            console.log("Could not save user");            
        }
    });
    
    return router;
}