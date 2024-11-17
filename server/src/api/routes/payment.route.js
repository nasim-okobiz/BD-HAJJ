const { Router } = require('express');
const controller = require('../../modules/payment/payment.controller.js');
const jwtAuth = require('../../middleware/auth/jwtAuth.js');

const PaymentRoute = Router();
// PaymentRoute.use(jwtAuth());
PaymentRoute
  .post('/user',jwtAuth('admin',), controller.createUserPayment)
  .get('/user', controller.getUserPayment)
  .get('/', controller.getAllPayment)
  .get('/pagination', controller.getAllPaymentWithPagination); 

PaymentRoute
  .route('/:id')
  .get(controller.getSinglePayment)


  module.exports = PaymentRoute;

