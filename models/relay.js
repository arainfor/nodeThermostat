var fs = require('fs');

/*
 * Get the Relay Object.
 */
exports.getByPath = function(path) {
    var retVal = fs.readFileSync(path, {encoding: 'utf-8'}).trim();
    console.log("Read: " + retVal + " from: " + path);
    // read the device at path to get the value
    return retVal;
};

exports.setByPath = function(path, bool) {
    console.log("write: " + bool + " to: " + path);
    return fs.writeFileSync(path, bool, {encoding: 'utf-8'});
}