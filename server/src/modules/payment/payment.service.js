const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const paymentRepository = require("./payment.repository.js");
const authRepository = require("../auth/auth.repository.js");
const Email = require("../../utils/Email.js");

class PaymentService extends BaseService {
  #repository;
  #authRepository;
  constructor(repository, authRepository, serviceName) {
    super(repository, authRepository, serviceName);
    this.#repository = repository;
    this.#authRepository = authRepository;
  }
  async createUserPayment(payload, session) {
    const { userIdPayRef, amount } = payload;
    console.log(payload)
    if (!userIdPayRef || !amount) {
      throw new Error("Missing required fields");
    }
    // auth user update receivedAmount add amount and amount dicrice 
    const user = await this.#authRepository.createUserPayment(userIdPayRef, amount, session);
    if (!user) throw new NotFoundError("User not found");
    payload.paymentMethod = 'on cash';
    const newPayment = await this.#repository.createPayment(payload, session);
    const userPayload = {
      userIdPayRef: userIdPayRef,
    }
    const userAgentPayment = await this.#repository.getUserIdByPayment(userPayload, session);
    const userInfo = await this.#authRepository.getUserById(userIdPayRef)
    if (userInfo){
      const stockAlertEmail = new Email({ email: userInfo?.email, name: userInfo?.name }, null);
      console.log("userInfo", stockAlertEmail)
      await stockAlertEmail.sendAgentPaymentInvoice(userAgentPayment);
    }

    return newPayment;
  }

  async getUserPayment(payload, session) {
    const payments = await this.#repository.getUserIdByPayment(payload, session);
    if (!payments) throw new NotFoundError("User Payment not found");
    return payments;
  }

  async getAllPayment(bookingRef) {
    return await this.#repository.getAllPayment(bookingRef);
  }
  async getSinglePayment(id) {
    const paymentData = await this.#repository.findOne({ status: true, _id: id }, ["paymentCategoryRef"]);
    if (!paymentData) throw new NotFoundError("Payment not found");
    return paymentData;
  }

  async getAllPaymentWithPagination(payload) {
    const payments = await this.#repository.getAllPaymentWithPagination(payload);
    return payments;
  }



}

module.exports = new PaymentService(paymentRepository, authRepository, "payment");
