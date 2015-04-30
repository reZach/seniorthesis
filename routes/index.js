var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var Time = require('./../models/time');
var Activity = require('./../models/activity');


function ensureAuthenticated(req, res) {
  if (req.isAuthenticated()) { return true; }
  return false;
}

// Routes
module.exports = function(passport){

    // Home
    router.get("/", function(req, res){    
        res.render("home", {title: "Express"});
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
        
        return res.status(401).json({});
    });
    
    router.get('/activitydata', function(req, res){    
        
        if (req.isAuthenticated()){        
            
            var user = req.user;                                 
            var u = User.findOne({
                "googleId": user.googleId
            });
            
            u.deepPopulate(['activities', 'activities.time']).exec(function (err, user){
                if (err){
                    console.log("error");
                }            
                
                return res.json(user);
            });
        } else {
        
            console.log("is not authenticated");
            
            return res.status(401).json({});
        }
    });

    router.post('/update', function(req, res) {
        
        if (req.isAuthenticated()){
        
            var user = req.user;
            var colors = JSON.parse(req.cookies.activityColors);
            var activities = JSON.parse(req.cookies.activities);
            
            // TESTS
            /*
            console.log(colors);
            console.log(activities);
            */
                        
            User.findOne({
                'googleId': user.googleId
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                
                // User was found                
                if (user) {                   
                    
                    for (var i = 0; i < activities.length; i++){ // Loop through activities
                    
                        // Create an activity
                        var singleActivity = new Activity({
                            name: activities[i].name,
                            active: activities[i].active,
                            selected: activities[i].selected,
                            idle: activities[i].idle,
                            activities: []
                        });                       
                        
                        for (var j = 0; j < activities[i].data.length; j++){ // Loop through data
                   
                            // Create data for the activity
                            var time = new Time({
                                date: activities[i].data[j].date,
                                time: activities[i].data[j].time,
                                timestamp: activities[i].data[j].timestamp
                            });
                            
                            // Need to save the data
                            time.save();
                            
                            singleActivity.time.push(time);                            
                        }
                        
                        // Need to save the activity
                        singleActivity.save();
                        user.activities.push(singleActivity);
                    }
                    
                    // Need to save the user
                    user.save(function(err){
                        if (err) {
                            console.log(err);
                        }
                        
                        console.log('User information updated');
                        res.send("User information updated");
                    });
                } else {
                    console.log('User was not found');
                    res.send("user was not found");
                }
            });
        
        
        } else {        
            console.log("Request isn't authenticated");
            res.send("request wasn't authenticated");
        }
    });
    
    return router;
}