var mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    date: String,
    time: {type: Number, default: 0},
    timestamp: {type: Number, default: 0},
    activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" }
});

mongoose.model("Data", Schema);