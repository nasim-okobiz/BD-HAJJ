const moment = require("moment-timezone");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const paymentSchema = new Schema({
    userRef: { //who pay
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    userIdPayRef: { // whom pay
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    userPay: {
        type: Boolean,
        default: false,
    },
    bookingRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'booking',
        // required: true
    },
    amount: {
        type: Number,
    },
    bankName: {
        type: String,
    },
    accountNumber: {
        type: String,
    },
    paymentDate: {
        type: Date,
        default: () => moment.tz("Asia/Dhaka").toDate()
    },
    paymentMethod: {
        type: String,
        enum: ['online', 'bank', 'on cash'],
    }
}, { timestamps: true });

module.exports.PaymentSchema = mongoose.model("payment", paymentSchema);
