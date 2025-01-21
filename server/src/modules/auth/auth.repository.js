
const { UserSchema } = require('../../models/index.js');
const pagination = require('../../utils/pagination.js');
const BaseRepository = require('../base/base.repository.js');
const moment = require("moment-timezone");

class AuthRepository extends BaseRepository {
  constructor(model) {
    super(model);
    this.model = model;  // Use model instead of #model to avoid issues with private fields
  }

  async getUserById(id) {
    return await this.model.findById(id).select('-password').exec();
  }

  async getAuthByEmail(email) {
    return await this.model.findOne({ email }).exec();
  }

  async getAuthByPhone(phone) {
    return await this.model.findOne({ phone }).exec();
  }
  async setUserOTP(id, OTP) {

    const user = await this.model.findByIdAndUpdate(id, { otp: OTP, otpTime: moment.tz("Asia/Dhaka").toDate() }, { new: true });
    return user;
  }
  async updateUserPassword(userId, password) {
    const user = await this.model.findByIdAndUpdate(userId, { password }, { new: true });
    return user;
  }

  async getAuthByEmailOrPhone(email, phone) {
    const query = { $or: [] };
    if (email) {
      query.$or.push({ email });
    }

    if (phone) {
      query.$or.push({ phone });
    }

    if (query.$or.length === 0) {
      return null;
    }

    const user = await this.model.findOne(query);
    return user;
  }

  async authUserSingUp(payload, session) {
    const { name, email, phone, password } = payload;
    const signingUpObject = { name, email, password, phone };
    const user = await this.model.create([signingUpObject], { session });
    return user;
  }

  async getAllUserWithPagination(payload) {
    try {
      const users = await this.model.find({})
        .sort({ createdAt: -1 });
      return users;
    } catch (error) {
      console.error("Error getting users with pagination:", error);
      throw error;
    }
  }

  async createUserPayment(id, amount, session) {
    const user = await this.model.findByIdAndUpdate(id, {
      $inc: { receivedAmount: amount, amount: -amount }
    }, { new: true, session });
    return user;
  }
}

module.exports = new AuthRepository(UserSchema);
