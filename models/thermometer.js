var sensor = require('ds18x20');

/*
 * Get the Thermometer Object.
 */
exports.getByDeviceId = function(deviceId) {
    console.log("Reading device: " + deviceId);
    return sensor.get(deviceId);
};

