var mongoose = require('mongoose');

var colorsSchema = new mongoose.Schema({
    googleId: {type: String, unique: true, required: true},
    colors:[{type: mongoose.Schema.Types.ObjectId, ref: 'ColorsData'}]
});


module.exports = mongoose.model('Colors', colorsSchema);