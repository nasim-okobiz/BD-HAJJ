const { Router } = require('express');
const controller = require('../../modules/membershipInfo/membershipInfo.controller.js');
const jwtAuth = require('../../middleware/auth/jwtAuth.js');
const { upload } = require('../../middleware/upload/upload.js');

const MembershipInfoRoute = Router();
// MembershipInfoRoute.use(jwtAuth());
MembershipInfoRoute
  .post('/',upload.any(), controller.createMembershipInfo)
  .get('/', controller.getMembershipInfo)
MembershipInfoRoute
  .route('/:id')
  .put(upload.any(), controller.updateMembershipInfo) 
  .delete(controller.deleteMembershipInfo);


  module.exports = MembershipInfoRoute;

