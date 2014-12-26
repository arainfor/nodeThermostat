//{"temperatures":[{"id":0,"name":"indoor","source":"28-0000065ce60f","fahrenheit":30.9},{"id":1,"name":"target","source":"/var/thermronstat/target/0","fahrenheit":"60.0"},{"id":2,"name":"outdoor","source":"28-0000065ce60f","fahrenheit":30.9},{"id":3,"name":"plenum","source":"28-0000065ce60f","fahrenheit":30.9}]}
var _ = require('underscore');

var temperatures = [
  { "id":0,"name":"indoor","source":"28-0000065ce60f","fahrenheit":30.9 },
  { "id":1,"name":"outdoor","source":"28-0000065ce60f","fahrenheit":30.9 },
  { "id":2,"name":"plenum","source":"28-0000065ce60f","fahrenheit":30.9 }
]

exports.list = function (req, res) {
  res.end(JSON.stringify(temperatures));
};

exports.create = function (req, res) {
  var temperature = {
    id: id++,
    name: req.body.name,
    path: req.body.path,
  };
  temperatures.push(temperature);
  res.end(JSON.stringify(temperature));
};

exports.update = function (req, res) {
  var temperature = _.findWhere(temperatures, {id: parseInt(req.params.id)});
    if (temperature) {
    if (req.body.name) {
      temperature.name = req.body.name;
    }
    if (req.body.path) {
      temperature.path = req.body.path;
    }
  } else {
    res.send('Temperature with id = ' + req.params.id + ' does not exists', 500);
  }
  res.end(JSON.stringify(temperature));
};

exports.query = function (req, res) {

  if (req.session.temperatures) {
    temperatures = req.session.temperatures;
  }

  var property = req.params.property;
  var value = req.params.value;
  var result = _.filter(temperatures, function (temperature) {
    return temperature[property] == value;
  });

  res.end(JSON.stringify(result || []));
};

exports.get = function (req, res) {

  var property = 'id';
  var value = req.params.id;
  var result = _.filter(temperatures, function (temperature) {
    return temperature[property] == value;
  });

  res.end(JSON.stringify(_.first(result) || {}));
};

exports.delete = function (req, res) {
  var id = req.params.id;
  temperatures = _.reject(temperatures, function (temperature) {
    return temperature.id == id;
  });
  res.end(JSON.stringify(temperatures || []));
};

exports.error = function (req, res) {
  res.send('Error while getting temperatures', 500);
};
