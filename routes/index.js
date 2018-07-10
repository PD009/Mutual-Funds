var express = require('express');
var router = express();

const trade_controller = require('../controllers/tradeController');

/* GET home page. */
router.get('/', function(req, res) {
  // res.redirect('/fc');
});
router.post('/demo', trade_controller.getName);
module.exports = router;