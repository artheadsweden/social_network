var express = require('express');
var router = express.Router();
var session = require('express-session')
var da = require('../data_access/da');

router.get('/', function(req, res){
    if(req.session && req.session.username) {
        res.render("logout");
    }
    else {
        res.render("login");
    }
});

router.post('/', function(req, res){
    //var session = req.session;
    da.login(function(err,_uname){
        if(uname.length > 0) {
            req.session.username = uname;
        }
        else {
            uname = 'Non';
        }
        res.render('index', {'user': uname});
    },req.body['username'], req.body['password']);
});

module.exports = router;