var express = require('express');
var router = express.Router();

module.exports = function(passport){

    router.post('/login', function(req, res, next){
    
        // Authenticate with passport
        passport.authenticate('login', function(err, user, info){
        
            if (err){
                return next(err);
            }
            
            if (!user){
                return res.status(401).json({'message': 'Incorrect user'});
            }
            
            req.logIn(user, function(err){
            
                if (err){
                    return next(err);
                }
                
                res.json(user);
            });
            
        })(req, res, next);    
    });
    
    router.post('/signup', function(req, res, next){
    
        User.findOne({username: req.body.username}, function(err, user) {
        
            if(user){
                res.status(409).json({message: 'User already exists'});
            } else {
            
                // Search for user by email
                User.findOne({email: req.body.email}, function(err, user) {
                
                    if(user){
                        res.status(409).json({message: 'Email already exists'});
                    } else {
                    
                        passport.authenticate('signup', function(err, user, info) {
                        
                            if (err){
                                return next(err);
                            }
                            
                            if (!user) {
                                res.status(500).json({message: 'Error'});
                            } else {
                                res.json(user);
                            }
                                                        
                        })(req, res, next);
                    }
                });
            }
        });
    });
    
    
    router.get('/signout', function(req, res) {
    
        req.logout();
        res.redirect('/');
    });
    
    router.get('/me', function(req, res, next) {
    
        if (req.isAuthenticated()){
            return res.json(req.user);
        }
        
        return res.status(401).json({error: 'Not signed on'});
    });
    
    return router;
}