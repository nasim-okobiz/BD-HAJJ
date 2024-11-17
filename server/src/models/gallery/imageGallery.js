const moment = require("moment-timezone");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const imageGalleryschema = new Schema({
    galleryType: {
        type: String,
        enum: ['Makka', 'Madina', 'Other'],
        required: true,
    },
    photo: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports.ImageGallerySchema = mongoose.model("imageGallery", imageGalleryschema);


