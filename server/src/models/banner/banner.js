const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerschema = new Schema({
    photo: {
        type: String,
    },
    status:{
        type: Boolean,
        default:true
    }

}, { timestamps: true });

module.exports.bannerSchema = mongoose.model("banner", bannerschema);

