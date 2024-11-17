const moment = require("moment-timezone");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const refundPolicyschema = new Schema({
    details: {
        type: String,
    },
   

}, { timestamps: true });

module.exports.RefundPolicySchema = mongoose.model("refundpolicy", refundPolicyschema);


