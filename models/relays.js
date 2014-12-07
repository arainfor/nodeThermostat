//var relays = [
//  {
//    "id": 0,
//    "name": "state",
//    "closed": "false"
//  },
//  {
//    "id": 1,
//    "name": "furnace",
//    "closed": "false"
//  }
//];
var relay = require('./relay');
var relays = [];
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('relays.properties');

exports.getAll = function() {
  var count = properties.get("count");
  console.log("Count:" + count);
  var i = 0;
  while (i < count) {
    relays[i] = {
      "id" : i,
      "name" : properties.get(i + ".name"),
      "closed" : relay.getByPath(properties.get(i + ".closed"))
    }
    i++;
  }
  return relays;
};

exports.getById = function(id) {
  return relays[id];
};