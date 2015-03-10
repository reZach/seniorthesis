var express = require('express');
var router = express.Router();

module.exports = function(passport){

    router.get('/login', function(req, res){
        res.render('login', {user: req.user});
    });    
    
    // Path for google authentication
    router.get('/auth/google',
        passport.authenticate('google', {failureRedirect: '/login'}),
        function(req, res) {
      
            // Redirect home if successful
            res.redirect('/');
        }
    );
    
    router.get('/auth/google/return',
        passport.authenticate('google', {failureRedirect: '/login'}),
        function(req, res) {
            
            res.redirect('/');
        }
    );
    
    router.get('/logout', function(req, res){
    
        req.logout();
        res.redirect('/');
    });
    
    return router;
}