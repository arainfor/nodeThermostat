var sensor = require('ds18x20');
var fs = require('fs');

/*
 * Get the Thermometer Object.
 */
exports.getByDeviceId = function(units, deviceId) {
    console.log("Reading device: " + deviceId);
    if (deviceId.indexOf("/") < 0) {
        if (units === 'c') {
          return cToF(sensor.get(deviceId));
        } else {
          return sensor.get(deviceId);
        }
    } else {
        // must be a file
        if (units === 'c') {
          return fToC(fs.readFileSync(deviceId, 'utf8').trim());
        } else {
          return fs.readFileSync(deviceId, 'utf8').trim();

        }
    }

};


var cToF = function(cel) {
    return (((cell * 9) / 5) + 32;
}

var fToC = function(far) {
    return (((far - 32) * 5) / 9);
}