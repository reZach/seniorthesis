var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    googleId: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

module.exports = mongoose.model('User', userSchema);