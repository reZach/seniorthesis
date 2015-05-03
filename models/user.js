var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');

var userSchema = new mongoose.Schema({
    googleId: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    colors: {type: mongoose.Schema.Types.ObjectId, ref: 'Colors' }
});

userSchema.plugin(deepPopulate); // Needed because we have models within this model

module.exports = mongoose.model('User', userSchema);