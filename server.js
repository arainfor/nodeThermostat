// libraries
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// data models
var temperatures = require('./models/temperatures');
var relays = require('./models/relays');
var relay = require('./models/relay');
var target = require('./models/target');
var status = require('./models/status');

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s', req.method, req.path);
  next();  
});

router.put('/status/:id', function(req, res, next) {
  console.log("set status with:" + req.body.value);
  res.json({'status' : status.set(req.body.value)});
});

router.get('/status', function(req, res, next) {
  res.json({'status' : status.get()});
});

router.get('/status/:id', function(req, res, next) {
  var value = status.getById(req.params.id)
  res.json({'status' : value});
});

router.put('/target/:id', function(req, res, next) {
  console.log("set target with:" + req.body.value);
  res.json({'target' : target.set(req.body.value)});
});

router.get('/target', function(req, res, next) {
  res.json({'fahrenheit' : target.get()});
});

router.get('/target/:id', function(req, res, next) {
  var value = target.getById(req.params.id)
  res.json({'fahrenheit' : value});
});

router.get('/temperature', function(req, res, next) {
  res.json(temperatures.getAll());
});

router.get('/temperature/:id', function(req, res, next) {
  var temperature = temperatures.getById(req.params.id)
  res.json(temperature);
});

router.route('/relay').get(function(req, res, next) {
      res.json({ relays: relays.getAll() });
});

router.route('/relay/:id').get(function(req, res, next) {
    var relayId = relays.getById(req.params.id)
    res.json(relayId);
  })

  .put(function(req, res) {
    console.log("put find relay:" + req.params.id);
    // find the relay we want to work with
    var relayId = relays.getById(req.params.id);

    relay.setByPath(relayId.path, req.body.closed);
    res.json(relays.getById(req.params.id));

    console.log('put complete');
  });

// Only requests to /api/ will be send to router.
app.use('/api', router);
app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log('Server listening on port ' + port);


