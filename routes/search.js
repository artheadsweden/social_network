var express = require('express');
var router = express.Router();
var da = require('../data_access/da');

router.post('/', function(req, res){
    da.search(function(err, users) {
        res.render('users', {title:'Search results', user_list: users});
    }, req.body['search']);
});

module.exports = router;