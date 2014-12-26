var _ = require('underscore');

var relays = [
  { "id":0,"name":"Running","path":"/var/thermronstat/relay/0","value":"0.0" }
];

var id = relays.length + 1;

exports.list = function (req, res) {
  res.end(JSON.stringify(relays));
};

exports.create = function (req, res) {
  var relay = {
    id: id++,
    name: req.body.name,
    path: req.body.path,
  };
  relays.push(relay);
  res.end(JSON.stringify(relay));
};

exports.update = function (req, res) {
  console.log("update!");
  var relay = _.findWhere(relays, {id: parseInt(req.params.id)});
  console.log("update req.body:" + JSON.stringify(req.body));
  console.log("update relay:" + JSON.stringify(relay));
  if (relay) {
    if (req.body.name) {
      console.log("req.body.name=" + req.body.name);
      relay.name = req.body.name;
    }
    if (req.body.path) {
      console.log("req.body.path=" + req.body.path);
      relay.path = req.body.path;
    }
    if (req.body.value) {
      console.log("req.body.value=" + req.body.value);
      relay.value = req.body.value;
    }
  } else {
    res.send('Relay with id = ' + req.params.id + ' does not exists', 500);
  }
  console.log("updated relay:" + JSON.stringify(relay));
  res.end(JSON.stringify(relay));
};

exports.query = function (req, res) {

  if (req.session.relays) {
    relays = req.session.relays;
  }

  var property = req.params.property;
  var value = req.params.value;
  var result = _.filter(relays, function (relay) {
    return relay[property] == value;
  });

  res.end(JSON.stringify(result || []));
};

exports.get = function (req, res) {

  var property = 'id';
  var value = req.params.id;
  var result = _.filter(relays, function (relay) {
    return relay[property] == value;
  });

  res.end(JSON.stringify(_.first(result) || {}));
};

exports.delete = function (req, res) {
  var id = req.params.id;
  relays = _.reject(relays, function (relay) {
    return relay.id == id;
  });
  res.end(JSON.stringify(relays || []));
};

exports.error = function (req, res) {
  res.send('Error while getting relays', 500);
};
