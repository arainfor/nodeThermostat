var _ = require('underscore');

var targets = [
  { "id":0,"name":"target","source":"/var/thermronstat/target/0","fahrenheit":"60.0" }
];

var id = targets.length + 1;

exports.list = function (req, res) {
  res.end(JSON.stringify(targets));
};

exports.create = function (req, res) {
  var target = {
    id: id++,
    name: req.body.name,
    path: req.body.path,
    fahrenheit: req.body.fahrenheit
  };
  targets.push(target);
  res.end(JSON.stringify(target));
};

exports.update = function (req, res) {
  console.log("update!");
  var target = _.findWhere(targets, {id: parseInt(req.params.id)});
  console.log("update req.body:" + JSON.stringify(req.body));
  console.log("update target:" + JSON.stringify(target));
  if (target) {
    if (req.body.name) {
      console.log("req.body.name=" + req.body.name);
      target.name = req.body.name;
    }
    if (req.body.path) {
      console.log("req.body.path=" + req.body.path);
      target.path = req.body.path;
    }
    if (req.body.fahrenheit) {
      console.log("req.body.fahrenheit=" + req.body.fahrenheit);
      target.fahrenheit = req.body.fahrenheit;
    }
  } else {
    res.send('Target with id = ' + req.params.id + ' does not exists', 500);
  }
  console.log("updated target:" + JSON.stringify(target));
  res.end(JSON.stringify(target));
};

exports.query = function (req, res) {

  if (req.session.targets) {
    targets = req.session.targets;
  }

  var property = req.params.property;
  var value = req.params.value;
  var result = _.filter(targets, function (target) {
    return target[property] == value;
  });

  res.end(JSON.stringify(result || []));
};

exports.get = function (req, res) {

  var property = 'id';
  var value = req.params.id;
  var result = _.filter(targets, function (target) {
    return target[property] == value;
  });

  res.end(JSON.stringify(_.first(result) || {}));
};

exports.delete = function (req, res) {
  var id = req.params.id;
  targets = _.reject(targets, function (target) {
    return target.id == id;
  });
  res.end(JSON.stringify(targets || []));
};

exports.error = function (req, res) {
  res.send('Error while getting targets', 500);
};
