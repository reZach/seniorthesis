var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
    name: String,
    data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Data' }]
});

mongoose.model('Activity', activitySchema);