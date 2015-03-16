var express = require('express');
var mongoose = require('mongoose');
var Data = require('./models/data');
var Activity = require('./models/activity');
var User = require('./models/user');

var router = express.Router();

function ensureAuthenticated(req, res) {
  if (req.isAuthenticated()) { return true; }
  return false;
}


module.exports = function(){

    router.post('/update', function(req, res, next) {
    
        var a = req.body;
        
        // Create or find user here
        User.findOne({
            'googleId': req.body.
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            
            // No user was found
            if (!user) {
                user = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    data: []
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
    });

    return router;
}