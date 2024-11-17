const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // unique: true,
  },
  phone: {
    type: String,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  address: {
    type: String,
  },
  isAgent: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    default: 0,
  },
  receivedAmount: {
    type: Number,
    default: 0,
  },
  membershipRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'memberShip',
  },
  role: {
    // emu
    type: String,
    enum: ['admin', 'user', 'agent'],
    default: 'user',
  },
  otp:{
    type: String,
  },
  otpTime: {
    type: Date,
  },

}, { timestamps: true });
// module.exports = mongoose.model("user", Userschema);
module.exports.UserSchema = mongoose.model("user", Userschema)

