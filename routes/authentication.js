var express = require('express');
var router = express.Router();

function isAuthenticated(req) {
    if (req.isAuthenticated()) { 
        return true;
    }  
    return false;
}

module.exports = function(passport){

    router.get('/auth/google',
        passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' })
    );
    
    router.get('/auth/google_oauth2/callback',
        passport.authenticate('google', {failureRedirect: '/'}),
        function(req, res) {            
            res.redirect('/');
        }
    );
    
    router.get('/logout', function(req, res){    
        req.logout();
        
        if (isAuthenticated(req) {
            res.redirect('/');
        }
    });
    
    return router;
}