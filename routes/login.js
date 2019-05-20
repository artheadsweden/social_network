const express = require('express');
const router = express.Router();
const da = require('../data_access/da');
const bcrypt = require('bcrypt');

router.get('/', function(req, res){
    res.render('login', {title: 'Login'});
});

router.post('/', function(req, res){
    da.getUserByUsername(req.body['username'], function(err, user){
        if(user) {
            bcrypt.compare(req.body['password'], user.password, function(err, answer){
                if(answer) {
                    console.log("You are who you are");
                }
                else {
                    console.log("Nope sorry no cake for you");
                    res.redirect('login', 401);
                }
            });
        }
        else {
            res.redirect('login', 401);
        }
    });
});

module.exports = router;