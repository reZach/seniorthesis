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
        
        return res.status(401).json({});
    });
    
    router.get('/activitydata', function(req, res){
    
        console.log("In method");
        
        if (req.isAuthenticated()){
        
            console.log("is authenticated");
            
            var user = req.user;
            
            console.log(user);
                                   
            User.findOne({
                "googleId": user.googleId
            }).deepPopulate(['data'], function (err, user){
                if (err) {
                    console.log("error: ");
                    console.log(err);
                    
                    return done(err);
                }
                
                console.log("sending back user");
                //return res.end(JSON.stringify(user));
                return res.end(user);
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
                    
                    user.markModified('data');
                    
                    for (var i = 0; i < activities.length; i++){ // Loop through activities
                    
                        var singleActivity = new Activity({
                            name: activities[i].name,
                            active: activities[i].active,
                            selected: activities[i].selected,
                            idle: activities[i].idle,
                            data: []
                        });                                                
                        
                        singleActivity.markModified('data');
                        
                        for (var j = 0; j < activities[i].data.length; j++){ // Loop through data
                   
                            var data = new Data({
                                date: activities[i].data[j].date,
                                time: activities[i].data[j].time,
                                timestamp: activities[i].data[j].timestamp
                            });
                            
                            singleActivity.data.push(data);
                        }
                        
                        user.data.push(singleActivity);
                    }
                    
                    user.save(function(err){
                        if (err) {
                            console.log(err);
                        }
                        
                        console.log('User information updated');
                        res.send("success");
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