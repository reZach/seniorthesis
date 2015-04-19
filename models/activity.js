var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
    name: String,
    active: Boolean,
    selected: Boolean,
    idle: Boolean,
    data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Data' }]
});

module.exports = mongoose.model("Activity", activitySchema);