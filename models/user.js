var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');

var userSchema = new mongoose.Schema({
    googleId: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

userSchema.plugin(deepPopulate);

module.exports = mongoose.model('User', userSchema);