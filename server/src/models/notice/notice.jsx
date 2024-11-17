const moment = require("moment-timezone");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const noticeschema = new Schema({
    notice: {
        type: String,
    },
}, { timestamps: true });

module.exports.NoticeSchema = mongoose.model("notice", noticeschema);


