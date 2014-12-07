var relay = require('./relay');
var relays = [];
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('relays.properties');

exports.getAll = function() {
  var count = properties.get("count");
  console.log("Count:" + count);
  var i = 0;
  while (i < count) {
    relays[i] = this.getById(i);
    i++;
  }
  return relays;
};

exports.getById = function(id) {
  console.log("relays getById:" + id);
  var path = properties.get(id + ".closed");
  console.log("path:" + path);
  var isClosed = relay.getByPath(path);
  console.log("isClosed?" + isClosed);
  return {
        "id" : id,
        "name" : properties.get(id + ".name"),
        "closed" : isClosed
  };
};