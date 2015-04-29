var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
    name: String,
    active: Boolean,
    selected: Boolean,
    idle: Boolean,
    time: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Time' }]
});

module.exports = mongoose.model("Activity", activitySchema);