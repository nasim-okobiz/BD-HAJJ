const moment = require("moment-timezone");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberShipschema = new Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    postOffice: {
        type: String,
        required: true,
    },
    division: {
        type: String,
    },
    district: {
        type: String,
    },
    upzila: {
        type: String,
    },
    union: {
        type: String,
    },
    photo: {
        type: String,
    },
    nidFront:{
        type: String,
    },
    nidBack: {
        type: String,
    },
    personCategory: {
        type: String,
        enum: ['alem', 'mufti', 'moulana', 'hafez', 'imam', 'teacher', 'general'],
        required: true,
    },
    agentType: {
        type: String,
        enum: ['silver', 'gold', 'diamond'],
        default: 'silver',
    },
    referUsers: {
        type: Number,
        default: 0,
    },
    referCode: {
        type: String,
    },

}, { timestamps: true });

module.exports.MemberShipSchema = mongoose.model("memberShip", memberShipschema);


