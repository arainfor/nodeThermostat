var sensor = require('ds18x20');
var fs = require('fs');

/*
 * Get the Thermometer Object.
 */
exports.getByDeviceId = function(units, deviceId) {
    console.log("Reading device: " + deviceId);
    if (deviceId.indexOf("/") < 0) {
        if (units === 'c') {
          return sensor.get(deviceId);
        } else {
          return cToF(sensor.get(deviceId));
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


exports.cToF = function(cel) {
    return (((cel * 9) / 5) + 32);
}

exports.fToC = function(far) {
    return (((far - 32) * 5) / 9);
}