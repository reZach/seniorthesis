var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();

var Data = mongoose.model("Data");
var Activity = mongoose.model("Activity");
var User = mongoose.model("User");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });  
});


module.exports = router;
