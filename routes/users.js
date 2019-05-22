var express = require('express');
var router = express.Router();
var da = require('../data_access/da');


/* GET users listing. */
router.get('/', function(req, res, next) {
  da.findPersons(function(err, users) {
    var userid = req.session['userid'];
    if(userid){
      da.getUserById(userid, function(err, user){
        res.render('users/users', {title:'User listing', user_list: users, userid: userid, friends: user.friends});
      });
    }
    else {
      res.render('users/users', {title:'User listing', user_list: users, userid: userid, friends: []});
    }

  });
});

router.post('/', function(req, res, next) {
  da.savePersonFromForm(req.body, function(err) {
    res.redirect('/users');
  });
});

router.get('/add', function(req, res){
  var userid = req.session['userid'];
  res.render('users/add', {title: 'Add User', userid: userid});
});

router.get('/delete', function(req, res){
  da.deleteUser(req.query.id, function(err){
    res.redirect('/users');
  });
});

router.get('/add_friend', function(req, res){
  da.addFriend(req.session['userid'], req.query.id, function(err){
    res.redirect('/users');
  });
});

module.exports = router;
