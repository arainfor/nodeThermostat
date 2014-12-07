/*
 * Get the Relay Object.
 */
exports.getByPath = function(path) {
    console.log("Hardcoded Read:" + path + " as false");
    // read the device at path to get the value
    return false;
};

exports.setByPath = function(path, bool) {
    console.log("Not implemented.. need to write the file:" + path + " value:" + bool);
    return bool;
}