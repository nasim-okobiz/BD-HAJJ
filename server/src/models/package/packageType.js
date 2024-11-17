const moment = require("moment-timezone");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageTypeschema = new Schema({
    name: {
        type: String,
        required: true,
    },
    priority: {
        type: Number,
    },

}, { timestamps: true });

module.exports.PackageTypeSchema = mongoose.model("packageType", packageTypeschema);

