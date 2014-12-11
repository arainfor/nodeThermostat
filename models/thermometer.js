var sensor = require('ds18x20');
var fs = require('fs');

/*
 * Get the Thermometer Object.
 */
exports.getByDeviceId = function(deviceId) {
    console.log("Reading device: " + deviceId);
    if (deviceId.indexOf("/") < 0) {
        return cToF(sensor.get(deviceId));
    } else {
        // must be a file
        return fs.readFileSync(deviceId, 'utf8').trim();
    }

};


var cToF = function(cel) {
    return (((cell * 9) / 5) + 32;
}