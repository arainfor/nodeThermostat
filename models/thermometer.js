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
    var pos = deviceId.indexOf("/");
    if (pos >= 0) {
        // The temperature is a raw double value in a file
        return fs.readFileSync(deviceId, {encoding: 'utf-8'}).trim();
    }


    return sensor.get(deviceId);
};

