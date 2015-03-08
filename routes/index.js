var mongoose = require("mongoose");
var express = require('express');
var passport = require('passport');
var router = express.Router();

var Data = mongoose.model("Data");
var Activity = mongoose.model("Activity");
var User = mongoose.model("User");

var isAuthenticated = function(req, res, next){

    // If user is authenticated in the session, call the
    // next() to call the next request handler
    //
    // Passport adds this method to the request object. A
    // middlewear is allowed to add properties to request
    // and response objects
    if (req.isAuthenticated()){
        return next();
    }
    
    // If the user is not authenticated, then redirect
    // to the login page
    res.redirect("/");
}


module.exports = function(passport){

    // GET login
    router.get("/", function(req, res){
    
        // Display the login page
        res.render("index", {title: "Express"});
    });
    
    // POST login
    router.post("/login", passport.authenticate("login", {
        successRedirect: "/index",
        failureRedirect: "/signup"
    }));
    
    // GET registration
    router.get("/signup", function(req, res){
    
        res.render("register");
    });
    
    // POST registration
    router.post("/signup", passport.authenticate("signup", {
        successRedirect: "/index",
        failureRedirect: "/signup"
    }));
    
    // GET home
    router.get("/index", isAuthenticated, function(req, res){
        
        res.render("index", {title: "Express"});
    });
    
    // Logout
    router.get("/signout", function(req, res){
        req.logout();
        res.redirect("/");
    });
    
    return router;
}