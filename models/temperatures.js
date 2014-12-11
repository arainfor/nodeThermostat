var sensor = require('ds18x20');
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

exports.init = function() {
    var isLoaded = sensor.isDriverLoaded();

    if (!isLoaded) {
      try {
          sensor.loadDriver();
          console.log('driver is loaded');
      } catch (err) {
          console.log('something went wrong loading the driver:', err)
      }
    }
}

exports.getAll = function() {
  var count = properties.get("count");
  var id = 0;

  console.log("Count:" + count);
  this.init();

  while (id < count) {

    var cValue = thermometer.getByDeviceId('c', properties.get(id + ".source"));
    temperatures[id] = {
      'id' : id,
      'name' : properties.get(id + ".name"),
      'source' : properties.get(id + ".source"),
      'centigrade' : cValue,
      'fahrenheit' : thermometer.cToF(cValue)
    };
    id++;
  }
  return temperatures;
};

exports.getById = function(id) {
  console.log("temperatures.getById:" + id + " device:" + properties.get(id+ ".source"));
  this.init();

  var cValue = thermometer.getByDeviceId('c', properties.get(id + ".source"));
  return {
    'id' : id,
    'name' : properties.get(id + ".name"),
    'source' :  properties.get(id+ ".source"),
    'centigrade' : cValue,
    'fahrenheit' : thermometer.cToF(cValue)
  };
};
