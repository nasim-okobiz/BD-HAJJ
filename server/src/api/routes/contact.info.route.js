const { Router } = require('express');
const controller = require('../../modules/contactInfo/contact.info.controller.js');

const ContactInfoRoute = Router();
// ContactInfoRoute.use(jwtAuth());
ContactInfoRoute
  .post('/', controller.createContactInfo)
  .get('/', controller.getAllContactInfo)

ContactInfoRoute
  .route('/:id')
  // .get(controller.getSingleContactInfo)
  .put( controller.updateContactInfo) 
  .delete(controller.deleteContactInfo);
ContactInfoRoute
  .put('/status/:id', controller.updateStatusContactInfo)

  module.exports = ContactInfoRoute;

