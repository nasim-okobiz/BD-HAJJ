const { Router } = require('express');
const controller = require('../../modules/joinUs/join.us.controller.js');
const { upload } = require('../../middleware/upload/upload.js');

const JoinUsRoute = Router();
// JoinUsRoute.use(jwtAuth());
JoinUsRoute
  .post('/',upload.any(), controller.createJoinUs)
  .get('/', controller.getAllJoinUs)

JoinUsRoute
  .route('/:id')
  // .get(controller.getSingleJoinUs)
  .put(upload.any(), controller.updateJoinUs) 
  .delete(controller.deleteJoinUs);
JoinUsRoute
  .put('/status/:id', controller.updateStatusJoinUs)

  module.exports = JoinUsRoute;

