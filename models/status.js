var fs = require('fs');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('thermostat.properties');

exports.get = function() {
    var path = properties.get("status.path");
    console.log("status.get" + path);
    var pos = path.indexOf("/");
    if (pos >= 0) {
        // The temperature is a raw double value in a file
        return fs.readFileSync(path, {encoding: 'utf-8'}).trim();
    }
    return null;
}

exports.set = function(value) {
    var path = properties.get("status.path");
    console.log("status.set value:" + value + " at " + path);
    var pos = path.indexOf("/");
    if (pos >= 0) {
        // The temperature is a raw double value in a file
        fs.writeFileSync(path, value, {encoding: 'utf-8'});
    }
    return this.get();
}

exports.getById = function(id) {
  console.log("status.getById:" + id);
  return this.get();
};
