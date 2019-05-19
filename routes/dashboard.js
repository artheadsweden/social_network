var express = require('express');
var router = express.Router();
const da = require('../data_access/da');
//var redirectLogin = require('./routerutils/redirect');

const rdl = (req, res, next) => {

    if(!req.session['userid']){
        res.render('login');
    }
    else{
        next();
    }
};

router.get('/', rdl ,function(req, res){
    da.getUserByUsername(req.session['username'], function(err, u){
        res.render('dashboard', {title: 'Dashbord for ' + req.session['username'], username: req.session['username'], user: u});
    });

});

module.exports = router;