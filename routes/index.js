
// Packages
var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();


module.exports = function(){

    // Routes
    router.get("/", function(req, res){
        res.render("index", {title: "Express"});
    });
    
    return router;
}