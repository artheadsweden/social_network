var express = require('express');
var router = express.Router();
var da = require('../data_access/da')

router.get('/', function(req, res){
    const n = Math.floor(Math.random() * 100 + 1);
    da.findPersons(function(err, users){
        res.render('lucky', {title: 'Lucky number', number: n, user_list: users});

    });
});

module.exports = router;