// libraries
var express = require('express');
var bodyParser = require('body-parser');

// data models
var temperatures = require('./models/temperatures');
var relays = require('./models/relays');
var relay = require('./models/relay');
var target = require('./models/target');

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

router.put('/target', function(req, res, next) {
  console.log("set target with:" + req.body.value);
  res.json({'target' : target.set(req.body.value)});
});

router.get('/target', function(req, res, next) {
  res.json({'target' : target.get()});
});

router.get('/temperatures', function(req, res, next) {
  res.json({ temperatures: temperatures.getAll() });
});

router.get('/temperatures/:id', function(req, res, next) {
  var temperature = temperatures.getById(req.params.id)
  res.json(temperature);
});


router.route('/relays')
  .get(function(req, res, next) {
      res.json({ relays: relays.getAll() });
  });

router.route('/relays/:id')
  .get(function(req, res, next) {
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
app.listen(port);
console.log('Server listening on port ' + port);


