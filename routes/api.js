var express = require('express');
var mongoose = require('mongoose');
var Data = require('./../models/time');
var Activity = require('./../models/activity');
var User = require('./../models/user');

var router = express.Router();

function ensureAuthenticated(req, res) {
  if (req.isAuthenticated()) { return true; }
  return false;
}


module.exports = function(){

    router.post('/update', function(req, res) {
    
        console.log("tes");
        
        res.send(req.body.name);
    });

    return router;
}