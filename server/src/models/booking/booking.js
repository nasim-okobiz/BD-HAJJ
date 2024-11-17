const moment = require("moment-timezone");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bookingSchema = new Schema({
    userRef: { //who booking
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    referenceSuccess: {
        type: Boolean,
        default: false
    },
    membershipRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'memberShip',
    },
    packageRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'package',
        required: true
    },
    dicountValidDate: {
        type: Date,
        // required: true
    },
    totalPerson: {
        type: Number,
        required: true
    },
    personRef: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'person'
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    totalPay: {
        type: Number,
        default: 0,
        required: true
    },
    totalDue: {
        type: Number,
        required: true
    },
    agentCommissions: {
        type: Number,
        default: 0,
    },
    minBookingPrice: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        default: () => moment.tz("Asia/Dhaka").toDate()
    },
    paymentMethod: {
        type: String,
        enum: ['bkash', 'nagad', 'dbblmobilebanking', 'visa', 'mastercard', 'amex', 'dbblnexus', ' upay', 'bank',],
    },
    bookingId: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports.BookingSchema = mongoose.model("booking", bookingSchema);

