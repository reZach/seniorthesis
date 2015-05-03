var mongoose = require('mongoose');

var colorsDataSchema = new mongoose.Schema({
    color: String,
    activity: String
});

module.exports = mongoose.model('ColorsData', colorsDataSchema);