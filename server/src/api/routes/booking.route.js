const { Router } = require('express');
const controller = require('../../modules/booking/booking.controller.js');
const jwtAuth = require('../../middleware/auth/jwtAuth.js');

const BookingRoute = Router();
// BookingRoute.use(jwtAuth());
BookingRoute
  .post('/success', controller.addAmountSuccess)
  .post('/fail', controller.addAmountFail)
  .post('/cancel', controller.addAmountCancel);
BookingRoute
  .post('/payment',jwtAuth('admin', 'user', 'agent'), controller.paymentBooking)
BookingRoute
  .post('/bank/payment',jwtAuth('admin', 'user', 'agent'), controller.bankPaymentBooking)

BookingRoute
  .post('/',jwtAuth('admin', 'user', 'agent'), controller.createBooking)
  .get('/', controller.getAllBooking)
  .get('/user/:id', controller.getBookingWithUserId)
  .get('/pagination', controller.getAllBookingWithPagination);

BookingRoute
  .route('/:id')
  .get(controller.getSingleBooking)
  .put(controller.updateBooking)
  .delete(controller.deleteBooking);

  module.exports = BookingRoute;
