const moment = require("moment-timezone");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const privacyPolicyschema = new Schema({
    details: {
        type: String,
    },


}, { timestamps: true });

module.exports.PrivacyPolicySchema = mongoose.model("privacypolicy", privacyPolicyschema);


