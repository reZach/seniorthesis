var mongoose = require('mongoose');

module.exports = mongoose.model('Data', {

    date: String,
    time: {type: Number, default: 0},
    timestamp: {type: Number, default: 0},
    activity: {type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}
});