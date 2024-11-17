const moment = require("moment-timezone");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageschema = new Schema({
    packageRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'packageType',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    discount: {
        type: Number,
        // required: true,
    },
    discountType: { 
        type: String,
        enum: ['percent', 'float'],
        // required: true,
    }, 
    discountPrice: {
        type: Number,
        // required: true,
    },
    validDate: {
        type: Date,
        // required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    minPayPrice: {
        type: Number,
        required: true,
    },
    mrpPrice: {
        type: Number,
        required: true,
    },
    roomType: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    hotalDistance: {
        type: [String],
    },
    packageIncludes: {
        type: [String],
    },
    packageExcludes: {
        type: [String],
    },
    documentsRequired: {
        type: [String],
    },
    bookingPolicy: {
        type: [String],
    },
    termsAndConditions: {
        type: String,
    },
    earlyBird: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

module.exports.PackageSchema = mongoose.model("package", packageschema);

