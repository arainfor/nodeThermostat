var express = require('express');
var temperatures = require('./models/temperatures');
var relays = require('./models/relays');

var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s', req.method, req.path);
  next();  
});

router.get('/temperatures', function(req, res, next) {
  res.json({ temperatures: temperatures.getAll() });
});

router.get('/temperatures/:id', function(req, res, next) {
  var temperature = temperatures.getById(req.params.id)
  res.json(temperature);
});

router.get('/relays', function(req, res, next) {
  res.json({ relays: relays.getAll() });
});

router.get('/relays/:id', function(req, res, next) {
  var relay = relays.getById(req.params.id)
  res.json(relay);
});

// Only requests to /api/ will be send to router.
app.use('/api', router);
app.listen(port);
console.log('Server listening on port ' + port);


