var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();

var Activity = mongoose.model("Activity");
var Data = mongoose.model("Data");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;
