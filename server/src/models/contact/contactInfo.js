const moment = require("moment-timezone");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactInfoschema = new Schema({
    agencyName: {
        type: String,
    },
    address: {
        type: [String], 
        required: true
      },
      email: {
        type: [String], 
        required: true
      },
      phone: {
        type: [String], 
        required: true
      },
      whatsapp: {
        type: [String], 
        required: true
      }

}, { timestamps: true });

module.exports.ContactInfoSchema = mongoose.model("contactInfo", contactInfoschema);

