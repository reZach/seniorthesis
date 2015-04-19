var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
    date: String,
    time: {type: Number, default: 0},
    timestamp: {type: Number, default: 0}
});

module.exports = mongoose.model('Data', dataSchema);