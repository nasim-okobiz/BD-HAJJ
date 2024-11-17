const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutUsschema = new Schema({
    header: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    photo: {
        type: String,
    },
    bgPhoto: {
        type: String,
    },
    agencyName: {
        type: String,
    },
    honorName: {
        type: String,
    },
    whatsApp: {
        type: String,
    },
    email: {
        type: String,
    },

}, { timestamps: true });
module.exports.AboutUsSchema = mongoose.model("aboutUs", AboutUsschema);


