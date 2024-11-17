const moment = require("moment-timezone");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const joinUsschema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    condition: { 
        type: [String], 
    },
    photo: {
        type: String,
    },
    amount: {
        type: Number, 
    }
}, { timestamps: true });

module.exports.JoinUsSchema = mongoose.model("JoinUs", joinUsschema);
