const moment = require("moment-timezone");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const membershipParameterschema = new Schema({
   particular: {
    type: String,
   },
   diamoan:{
    type: String,
   },
   gold: {
    type: String,
   },
   silver: {
    type: String,
   },

}, { timestamps: true });

module.exports.MembershipParameterSchema = mongoose.model("membershipParameter", membershipParameterschema);


