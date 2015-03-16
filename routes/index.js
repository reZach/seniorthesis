var express = require('express');
var router = express.Router();

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
        
        return res.status(409).json({});
    });   
    
    return router;
}