var _ = require('underscore');

var statuses = [
  { "id":0,"name":"System On","path":"/var/thermronstat/status/0","value":"0.0" }
];

var id = statuses.length + 1;

exports.list = function (req, res) {
  res.end(JSON.stringify(statuses));
};

exports.create = function (req, res) {
  var status = {
    id: id++,
    name: req.body.name,
    path: req.body.path,
  };
  statuses.push(status);
  res.end(JSON.stringify(status));
};

exports.update = function (req, res) {
  console.log("update!");
  var status = _.findWhere(statuses, {id: parseInt(req.params.id)});
  console.log("update req.body:" + JSON.stringify(req.body));
  console.log("update status:" + JSON.stringify(status));
  if (status) {
    if (req.body.name) {
      console.log("req.body.name=" + req.body.name);
      status.name = req.body.name;
    }
    if (req.body.path) {
      console.log("req.body.path=" + req.body.path);
      status.path = req.body.path;
    }
    if (req.body.value) {
      console.log("req.body.value=" + req.body.value);
      status.value = req.body.value;
    }
  } else {
    res.send('status with id = ' + req.params.id + ' does not exists', 500);
  }
  console.log("updated status:" + JSON.stringify(status));
  res.end(JSON.stringify(status));
};

exports.query = function (req, res) {
  if (req.session.statuses) {
    statuses = req.session.statuses;
  }

  var property = req.params.property;
  var value = req.params.value;
  var result = _.filter(statuses, function (status) {
    return status[property] == value;
  });

  res.end(JSON.stringify(result || []));
};

exports.get = function (req, res) {
  var property = 'id';
  var value = req.params.id;
  var result = _.filter(statuses, function (status) {
    return status[property] == value;
  });

  res.end(JSON.stringify(_.first(result) || {}));
};

exports.delete = function (req, res) {
  var id = req.params.id;
  statuses = _.reject(statuses, function (status) {
    return status.id == id;
  });
  res.end(JSON.stringify(statuses || []));
};

exports.error = function (req, res) {
  res.send('Error while getting statuses', 500);
};
