var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();

var Data = mongoose.model("Data");
var Activity = mongoose.model("Activity");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });  
});

router.post("/addusers", function(req, res, next){

    
});


module.exports = router;
