var thermometer = require('./thermometer');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('thermostat.properties');

/*
Read a configuration file that defines the available temperature sources
the configuration contains the entire list.

When source is thermometer then data is read from a device.
When source is user then data is provided by user input.
 */
var temperatures = [];
exports.getAll = function() {
  var count = properties.get("count");
  var i = 0;

  console.log("Count:" + count);

  while (i < count) {
    temperatures[i] = {
      'id' : i,
      'name' : properties.get(i + ".name"),
      'source' : properties.get(i+ ".source"),
      'centigrade' : thermometer.getByDeviceId(properties.get(i+ ".source"))
    };
    i++;
  }
  return temperatures;
};

exports.getById = function(id) {
  console.log("temperatures.getById:" + id + " device:" + properties.get(id+ ".source"));
  return {
    'id' : id,
    'name' : properties.get(id + ".name"),
    'source' :  properties.get(id+ ".source"),
    'centigrade' : thermometer.getByDeviceId(properties.get(id+ ".source"))
  };
};
