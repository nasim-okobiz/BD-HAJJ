const moment = require("moment-timezone");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const membershipInfoschema = new Schema({
   header: {
    type: String,
   },
   title:{
    type: String,
   },
   description: {
    type: String,
   },
   detail: {
    type: String,
   },
   photo: {
    type: String,
   },

}, { timestamps: true });

module.exports.MembershipInfoSchema = mongoose.model("membershipInfo", membershipInfoschema);


