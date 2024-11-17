const { Router } = require('express');
const controller = require('../../modules/contactUs/contact.us.controller.js');

const ContactUsRoute = Router();
// ContactUsRoute.use(jwtAuth());
ContactUsRoute
  .post('/', controller.createContactUs)
  .get('/', controller.getAllContactUs)

ContactUsRoute
  .route('/:id')
  // .get(controller.getSingleContactUs)
  .put( controller.updateContactUs) 
  .delete(controller.deleteContactUs);
ContactUsRoute
  .put('/status/:id', controller.updateStatusContactUs)

  module.exports = ContactUsRoute;

