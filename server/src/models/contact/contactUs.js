const moment = require("moment-timezone");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const contactUsschema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    subject:{
        type: String,
    },
    massage: {
        type: String,
    }

}, { timestamps: true });

module.exports.ContactUsSchema = mongoose.model("contactUs", contactUsschema);
