const moment = require("moment-timezone");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FAQschema = new Schema({
    title: {
        type: String,
    },
    details: {
        type: String,
    },
    status:{
        type: Boolean,
        default:true
    }

}, { timestamps: true });

module.exports.FAQSchema = mongoose.model("faq", FAQschema);


