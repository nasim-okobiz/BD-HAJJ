const { Router } = require('express');
const controller = require('../../modules/person/person.controller.js');
const { upload } = require('../../middleware/upload/upload.js');


const PersonRoute = Router();
// PersonRoute.use(jwtAuth());
PersonRoute
  // .post('/', controller.createPerson)
  .get('/', controller.getAllPerson)
  .get('/pagination', controller.getAllPersonWithPagination);

PersonRoute
  .route('/:id')
  .get(controller.getSinglePerson)
  .put(upload.any(), controller.updatePerson)
  .delete(controller.deletePerson);

  module.exports = PersonRoute;


