const moment = require("moment-timezone");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personschema = new Schema({
    name: {
        type: String,
        // required: true,
    },
    eamil: {
        type: String,
    },
    phone:{
        type: String,
    },
    postOffice:{
        type: String,
    },
    division: {
        type: String,
    },
    district: {
        type: String,
    },
    upazila: {
        type: String,
    },
    union: {
        type: String,
    },
    nidFront: {
        type: String,
    },
    nidBack: {
        type: String,
    },
    passportFront: {
        type: String,
    },
    passportBack: {
        type: String,
    },
    passportPhoto:{
        type: String,
    },
    presentAddress: {
        type: String,
        trim: true, 
      },
      permanentAddress: {
        type: String,
        trim: true, 
      },
      postCode: {
        type: String,
      },

}, { timestamps: true });

module.exports.PersonSchema = mongoose.model("person", personschema);


