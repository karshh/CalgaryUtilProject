var express = require('express');
var router = express.Router();
var trafficData = require('./trafficData');

/* GET home page. */
router.get('/', function(req, res, next) {
  trafficData.getJSONdata(req,res, 'index');
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});


router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Express' });
});


router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/trafficData', (req, res) => res.send(trafficData.commuteData));

module.exports = router;
