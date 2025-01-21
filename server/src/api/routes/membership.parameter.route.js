const { Router } = require('express');
const controller = require('../../modules/membershipParameter/membership.parameter.controller.js');
const jwtAuth = require('../../middleware/auth/jwtAuth.js');

const MembershipParameterRoute = Router();
// MembershipParameterRoute.use(jwtAuth());
MembershipParameterRoute
  .post('/', controller.createMembershipParameter)
  .get('/', controller.getMembershipParameter)
MembershipParameterRoute
  .route('/:id')
  .put( controller.updateMembershipParameter) 
  .delete(controller.deleteMembershipParameter);


  module.exports = MembershipParameterRoute;

