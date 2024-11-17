const moment = require("moment-timezone");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const termsAndConditionsschema = new Schema({
    details: {
        type: String,
    },


}, { timestamps: true });

module.exports.TermsAndConditionsSchema = mongoose.model("termsandconditions", termsAndConditionsschema);


