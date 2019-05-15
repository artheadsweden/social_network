var express = require('express');
var router = express.Router();
var da = require('../data_access/da')


/* GET users listing. */
router.get('/', function(req, res, next) {
  da.findPersons(function(err, users) {
    res.render('users', {title:'User listing', user_list: users});
  });

});

router.post('/', function(req, res, next) {
  da.savePersonFromJson(req.body);
  res.send("Saved");
});
module.exports = router;
