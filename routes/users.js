var express = require('express');
var router = express.Router();
var da = require('../data_access/da')


/* GET users listing. */
router.get('/', function(req, res, next) {
  da.findPersons(function(err, users) {
    res.render('users/users', {title:'User listing', user_list: users});
  });

});

router.post('/', function(req, res, next) {
  da.savePersonFromForm(req.body);
  res.send("Saved");
});

router.get('/add', function(req, res){
  res.render('users/add', {title: 'Add User'});
});

module.exports = router;
