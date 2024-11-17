const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const isArrayElementExist = require("../../utils/isArrayElementExist.js");
const bookingRepository = require("./booking.repository.js");
const { isMainThread } = require("worker_threads");
const personRepository = require("../person/person.repository.js");
const packageRepository = require("../package/package.repository.js");
const authRepository = require("../auth/auth.repository.js");

const SSLCommerzPayment = require('sslcommerz-lts');
const membershipRepository = require("../membership/membership.repository.js");
const Email = require("../../utils/Email.js");


const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASSWD
const is_live = false //true for live, false for sandbox


class BookingService extends BaseService {
  #repository;
  #personRepository;
  #packageRepository;
  #authRepository;
  #membershipRepository;
  constructor(repository, personRepository, packageRepository, authRepository, membershipRepository, serviceName) {
    super(repository, personRepository, packageRepository, authRepository, membershipRepository, serviceName);
    this.#repository = repository;
    this.#personRepository = personRepository;
    this.#packageRepository = packageRepository;
    this.#authRepository = authRepository;
    this.#membershipRepository = membershipRepository;
  }

  generateBookingId() {
    const date = new Date();

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // e.g., "27"
    const month = String(date.getMonth() + 1).padStart(2, '0'); // e.g., "10" (October)
    const year = String(date.getFullYear()).slice(-2); // e.g., "24" (2024)

    // Generate a random 5-digit number
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Ensures 5 digits

    // Combine to form the booking ID with "bok" prefix
    const bookingId = `BOK${day}${month}${year}${randomNumber}`;

    return bookingId;
  }

  async createBooking(payload, session) {

    const { userRef, packageRef, totalPerson, memberId } = payload;
    console.log(userRef, packageRef, totalPerson, memberId);

    if (!packageRef || !totalPerson) {
      throw new Error("Please fill up all required fields.");
    }

    if (!payload.personRef) {
      payload.personRef = [];
    }

    if (totalPerson > 0) {
      for (let i = 0; i < totalPerson; i++) {
        const personData = await this.#personRepository.createPerson({}, session);
        payload.personRef.push(personData[0]._id);
      }
    }

    const packageData = await this.#packageRepository.findById(packageRef);
    // console.log(packageData);

    if (!packageData) {
      throw new Error("Package not found");
    }
    payload.totalPrice = packageData.mrpPrice * totalPerson;
    payload.totalDue = packageData.mrpPrice * totalPerson;
    payload.minBookingPrice = packageData.minPayPrice * totalPerson;
    if (packageData.validDate) {
      payload.dicountValidDate = packageData.validDate;
    }
    payload.bookingId = this.generateBookingId()
    const memberIdValidate = await this.#membershipRepository.findMembershipByReferCode(memberId)
    console.log("memberIdValidate", memberIdValidate);

    if (memberIdValidate) {
      const memberData = await this.#authRepository.findOne({ _id: memberIdValidate?.userRef, role: 'agent' });
      console.log("memberData", memberData);

      if (memberData) {
        payload.referenceSuccess = true
        payload.membershipRef = memberIdValidate?._id
      }
    }
    console.log("payload", payload);

    const bookingData = await this.#repository.createBooking(payload);
    return bookingData;
  }


  async getAllBooking() {
    return await this.#repository.findAll({}, ["personRef", "userRef", "packageRef", 'membershipRef'], { userRef: "-password" });
  }

  async getAllBookingWithPagination(payload) {
    const bookings = await this.#repository.getAllBookingWithPagination(payload);
    return bookings;
  }

  async getBookingWithUserId(userId) {
    const bookings = await this.#repository.findAll({ userRef: userId }, ["personRef", "userRef", "packageRef"], { userRef: "-password" });
    return bookings;
  }
  async getSingleBooking(id) {
    const booking = await this.#repository.findById(id, ["packageRef", "personRef"]);
    if (!booking) throw new NotFoundError("Booking not found");
    return booking;
  }

  async updateBooking(id, payload) {
    const { title, description,
      textEditor, bookingCategoryRef } = payload;
    if (!title || !description || !textEditor || !bookingCategoryRef) throw new Error("All fields are required");

    const bookingData = await this.#repository.updateBooking(id, payload);
    if (!bookingData) throw new Error("Booking not found");
    if (bookingData) {
      await removeUploadFile(bookingData?.photo)
    }
    return bookingData;

  }

  async updateStatusBooking(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const booking = await this.#repository.updateStatus(id, { status: status });
    console.log("booking", booking);
    if (!booking) throw new NotFoundError("Booking not found");
    return booking;
  }

  async getCategoryWiseBooking(id) {
    const booking = await this.#repository.getCategoryWiseBooking(id);
    if (!booking) throw new NotFoundError("Booking not found");
    return booking;
  }

  async deleteBooking(id) {
    const booking = await this.#repository.findById(id);
    if (!booking) throw new NotFoundError("Booking not found");
    const deletedBooking = await this.#repository.deleteById(id);

    return deletedBooking;
  }

  async bankPaymentBooking(payload, session) {
    const { bookingRef, amount, accountNumber, bankName } = payload;
    try {
      const result = await this.#repository.bankPaymentBooking(bookingRef, amount, accountNumber, bankName, session)
      if (result) {
        const stockAlertEmail = new Email({ email: result?.userRef?.email, name: result?.userRef?.name }, null);
        await stockAlertEmail.sendbookingPaymnetBankInvoice(result);
      }
      return result;
    } catch (error) {
      console.error('Error adding amount:', error);
      throw new Error('Failed to add amount');
    }
  }

  // payment methods =================================================================
  async paymentBooking(payload, session) {
    const { amount, bookingRef, userId } = payload;

    // Validate payload
    console.log('userId', userId);

    if (!amount) {
      throw new NotFoundError('fill up required fields');
    }
    // const transactionPlayload = {
    //     user_ref : userId,
    //     amount,
    //     type: 'Credit',
    //     status: 'Create',
    // }
    // const createTransaction = await this.#repository.createTransaction(transactionPlayload, session);
    // const objectId = createTransaction[0]?._id;
    // const idString = objectId?.toString(); // Convert ObjectId to string
    // console.log('tran_id', idString);
    const data = {
      total_amount: amount,
      currency: 'BDT',
      tran_id: bookingRef, // use unique tran_id for each api call
      success_url: `${process.env.SERVER_BASE_URL}/booking/success`,
      fail_url: `${process.env.SERVER_BASE_URL}/booking/fail`,
      cancel_url: `${process.env.SERVER_BASE_URL}/booking/cancel`,
      ipn_url: `${process.env.SERVER_BASE_URL}/ipn`,
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    // SSLCommerz payment initialization
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    try {
      const apiResponse = await sslcz.init(data);
      const GatewayPageURL = apiResponse.GatewayPageURL;
      console.log('Redirecting to: ', GatewayPageURL);
      return { url: GatewayPageURL };
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw new Error('Payment initialization failed');
    }
  }

  async addAmountSuccess(id, payload, session) {
    const { tran_id, amount, } = payload;
    try {
      const status = "Success";
      const result = await this.#repository.bookingPayment(tran_id, amount, session)
      console.log("result ==============", result);
      if (result) {
        const stockAlertEmail = new Email({ email: "nasim.okobiz@gmail.com", name: result?.userRef?.name }, null);
        await stockAlertEmail.sendbookingPaymnetOnlineInvoice(result);
      }

      return result;
    } catch (error) {
      console.error('Error adding amount:', error);
      throw new Error('Failed to add amount');
    }
  }
  // async addAmountFail(id, session) {
  //   console.log('Amount:', id);
  //   try {
  //     const status = "Fail";
  //     const transactionUpdate = await this.#repository.transactionUpdate(id, status, session);
  //     if (!transactionUpdate) throw new Error('Transaction failed');
  //     return transactionUpdate;
  //   } catch (error) {
  //     console.error('Error adding amount:', error);
  //     throw new Error('Failed to add amount');
  //   }
  // }

  // async addAmountCancel(id, session) {
  //   console.log('Amount:', id);
  //   try {
  //     const status = "Cancel";
  //     const transactionUpdate = await this.#repository.transactionUpdate(id, status, session);
  //     if (!transactionUpdate) throw new Error('Transaction failed');
  //     return transactionUpdate;
  //   } catch (error) {
  //     console.error('Error adding amount:', error);
  //     throw new Error('Failed to add amount');
  //   }
  // }
}

module.exports = new BookingService(bookingRepository, personRepository, packageRepository, authRepository, membershipRepository, "booking");
