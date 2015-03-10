var mongoose = require('mongoose');

module.exports = mongoose.model('Activity', {

    name: String,
    data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Data' }]
});