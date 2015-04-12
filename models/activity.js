var mongoose = require('mongoose');

module.exports = mongoose.model('Activity', {

    name: String,
    active: Boolean,
    selected: Boolean,
    idle: Boolean,
    data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Data' }]
});