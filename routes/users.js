var express = require('express');
var router = express.Router();
var da = require('../data_access/da')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond to GET');
});

router.post('/', function(req, res, next) {
  da.savePersonFromJson(req.body);
  res.send("Saved");
});
module.exports = router;
