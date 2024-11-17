const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const PaymentService = require("./payment.service.js");
const Email = require("../../utils/Email.js");


class PaymentController {
  createUserPayment = withTransaction( async (req, res, next, session) => {
    const userId = req.user.user_info_encrypted.id;
    const payload = {
      userRef : userId,
      userIdPayRef : req.body.userIdPayRef,
      amount: req.body.amount
    };
    const paymentResult = await PaymentService.createUserPayment(payload, session);
    const resDoc = responseHandler(200, "User Payment Created", paymentResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getUserPayment = withTransaction( async (req, res, next, session) => {
    const userIdPayRef = req?.query?.userIdPayRef;
    const payload = {
      userIdPayRef: userIdPayRef
    };
    const paymentResult = await PaymentService.getUserPayment(payload, session);
    const resDoc = responseHandler(200, "User Payment get successfully", paymentResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getAllPayment = catchError(async (req, res, next) => {
    const bookingRef = req.query.bookingRef
    const paymentResult = await PaymentService.getAllPayment(bookingRef);
    const resDoc = responseHandler(200, "Get All Payments", paymentResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  getSinglePayment = catchError(async (req, res, next) => {
    const id = req.params.id;
    const paymentResult = await PaymentService.getSinglePayment(id);
    const resDoc = responseHandler(200, "Get Single Payment", paymentResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  getAllPaymentWithPagination = catchError(async (req, res, next) => {
    let payload={
			page: req.query.page,
			limit: req.query.limit,
			order: req.query.order,
      paymentCategoryRef: req.query.paymentCategoryRef,
		}
    const paymentResult = await PaymentService.getAllPaymentWithPagination(payload);
    const resDoc = responseHandler(200, 'Payments get successfully', paymentResult);
    res.status(resDoc.statusCode).json(resDoc);
  });



}

module.exports = new PaymentController();

