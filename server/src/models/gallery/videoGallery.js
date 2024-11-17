const moment = require("moment-timezone");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const videoGalleryschema = new Schema({
    video: {
        type: String,
    },
    status:{
        type: Boolean,
        default:true
    }

}, { timestamps: true });

module.exports.videoGallerySchema = mongoose.model("videoGallery", videoGalleryschema);


