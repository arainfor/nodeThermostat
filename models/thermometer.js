var sensor = require('ds18x20');
var fs = require('fs');

exports.init = function() {
    var isLoaded = sensor.isDriverLoaded();
    console.log(isLoaded);

    if (!isLoaded) {
      try {
          sensor.loadDriver();
          console.log('driver is loaded');
      } catch (err) {
          console.log('something went wrong loading the driver:', err)
      }
    }
}

/*
 * Get the Thermometer Object.
 */
exports.getByDeviceId = function(deviceId) {
    console.log("Reading device: " + deviceId);
    return sensor.get(deviceId);
};

