const { Router } = require('express');
const controller = require('../../modules/faq/faq.controller.js');
const jwtAuth = require('../../middleware/auth/jwtAuth.js');

const FAQRoute = Router();
// FAQRoute.use(jwtAuth());
FAQRoute
  .post('/', controller.createFAQ)
  .get('/', controller.getAllFAQ)
  .get('/pagination', controller.getAllFAQWithPagination); 

FAQRoute
  .route('/:id')
  // .get(controller.getSingleFAQ)
  .put( controller.updateFAQ) 
  .delete(controller.deleteFAQ);
FAQRoute
  .put('/status/:id', controller.updateStatusFAQ)

  module.exports = FAQRoute;

