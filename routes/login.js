const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const da = require('../data_access/da');

router.get('/', function(req, res) {
    res.render('login');
});

router.post('/', function(req, res){
    da.getUserByUsername(req.body['username'], function(err, user){
        if(user) {
            bcrypt.compare(req.body['password'], user.password, function (err, answer) {

                if(answer){
                    req.session.userid = user._id;
                    req.session.username = user.username;
                    da.getUserByUsername(user.username, function(err, u){
                        res.render('dashboard', {title: 'Dashbord for ' + req.session['username'], username: req.session['username'], user: u});
                    });
                }else {
                    res.render('index', {title: 'Social Network'});
                }
            });
        }
    });
});

module.exports = router;