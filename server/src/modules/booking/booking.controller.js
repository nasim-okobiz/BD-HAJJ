const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const BookingService = require("./booking.service.js");
const config = require("../../config/config.js");


class BookingController {
  //
  createBooking = withTransaction(async (req, res, next, session) => {

    const userId = req.user.user_info_encrypted.id;
    const payload = {
      userRef: userId,
      packageRef: req.body.packageRef,
      totalPerson: req.body.totalPerson,
      memberId: req.body.memberId,
    }
    const bookingResult = await BookingService.createBooking(
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "Booking Created successfully",
      bookingResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllBooking = catchError(async (req, res, next) => {
    const bookingResult = await BookingService.getAllBooking();
    const resDoc = responseHandler(200, "Get All Bookings", bookingResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  getAllBookingWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
      packageRef: req.query.packageRef,
      membershipRef: req.query.membershipRef
    }
    const bookingResult = await BookingService.getAllBookingWithPagination(payload);
    const resDoc = responseHandler(200, 'Bookings get successfully', bookingResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getBookingWithUserId = catchError(async (req, res, next) => {
    const id = req.params.id;
    const bookingResult = await BookingService.getBookingWithUserId(id);
    const resDoc = responseHandler(200, "Get Booking By User ID", bookingResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  getSingleBooking = catchError(async (req, res, next) => {
    const id = req.params.id;
    const bookingResult = await BookingService.getSingleBooking(id);
    const resDoc = responseHandler(200, "Get Single Booking", bookingResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateBooking = catchError(async (req, res, next) => {
    const id = req.params.id;

    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      userRef: userId,
      packageRef: req.body.packageRef,
      totalPerson: req.body.totalPerson,
      memberId: req.body.memberId,
    }
    const bookingResult = await BookingService.updateBooking(id, payload);
    const resDoc = responseHandler(201, "Booking Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateStatusBooking = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const bookingResult = await BookingService.updateStatusBooking(id, status);
    const resDoc = responseHandler(201, "Booking Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  getCategoryWiseBooking = catchError(async (req, res, next) => {
    const id = req?.params?.id;
    const bookingResult = await BookingService.getCategoryWiseBooking(id);
    const resDoc = responseHandler(200, "Get Category Wise Bookings", bookingResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteBooking = catchError(async (req, res, next) => {
    const id = req.params.id;
    const bookingResult = await BookingService.deleteBooking(id);
    const resDoc = responseHandler(200, "Booking Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  bankPaymentBooking = withTransaction(async (req, res, next, session) => {


    const { amount, bookingRef, accountNumber, bankName } = req.body;
    const payload = { amount, bookingRef, accountNumber, bankName };
    const amountResult = await BookingService.bankPaymentBooking(payload, session);
    const resDoc = responseHandler(201, 'Amount Add successfully', amountResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  //  payment methods =================================================================
  paymentBooking = withTransaction(async (req, res, next, session) => {
    const userId = req.user.user_info_encrypted.id;
    const { amount, bookingRef } = req.body;
    const payload = {
      amount,
      bookingRef,
      userId
    };
    const amountResult = await BookingService.paymentBooking(payload, session);

    const resDoc = responseHandler(201, 'Amount Created successfully', amountResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  addAmountSuccess = withTransaction(async (req, res, next, session) => {


    const { amount, tran_id, currency, status } = req.body;
    const { id } = req.params;
    const payload = { amount, tran_id, currency, status };
    const amountResult = await BookingService.addAmountSuccess(id, payload, session);

    if (amountResult) {
      res.redirect(`${config.clientBaseURL}/user/success`)
    } else {
    }
    // const resDoc = responseHandler(201, 'Amount Created successfully', amountResult);
    // res.status(resDoc.statusCode).json(resDoc);
  })
  addAmountFail = withTransaction(async (req, res, next, session) => {
    // const { id } = req.params;
    // const amountResult = await BookingService.addAmountFail(id, session);
    // if (amountResult) {

    // } else {
    // }
    res.redirect(`${config.clientBaseURL}/user/fail`)

  })
  addAmountCancel = withTransaction(async (req, res, next, session) => {
    // const { id } = req.params;
    // const amountResult = await BookingService.addAmountCancel(id, session);
    // if (amountResult) {

    // } else {
    // }
    res.redirect(`${config.clientBaseURL}/user/cancle`)

  })
}

module.exports = new BookingController();

