const { Router } = require('express');
const controller = require('../../modules/notice/notice.controller.js');
const jwtAuth = require('../../middleware/auth/jwtAuth.js');

const NoticeRoute = Router();
// NoticeRoute.use(jwtAuth());
NoticeRoute
  .post('/', controller.createNotice)
  .get('/', controller.getNotice)
NoticeRoute
  .route('/:id')
  .put( controller.updateNotice) 
  .delete(controller.deleteNotice);


  module.exports = NoticeRoute;

