var express = require('express');
var router = express.Router();
var da = require('../data_access/da');

/* GET users listing. */
router.get('/', function(req, res, next) {
  da.findPersons(function(err, users) {
    res.render('users/users', {title:'User listing', user_list: users});
  });
});



router.get('/delete', function(req, res) {
  da.deleteUser(function(err){
    da.findPersons(function(err, users) {
      res.render('users/users', {title:'User listing', user_list: users});
    });
  }, req.query.id);
});

router.post('/', function(req, res, next) {
  da.savePersonFromJson(req.body, function(err){
    da.findPersons(function(err, users) {
      res.render('users/users', {title:'User listing', user_list: users});
    });  });
});

/* Create new User */
router.get('/add_user', function(req, res) {
  res.render('users/create', {title: "Add user"});
});


module.exports = router;
