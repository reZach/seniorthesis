var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: String,
    data: [{ type: mongoose.Schema.Types.ObjectId, ref: "Data" }]
});

mongoose.model("Activity", Schema);