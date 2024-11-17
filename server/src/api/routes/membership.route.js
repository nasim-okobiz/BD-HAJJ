const { Router } = require('express');
const controller = require('../../modules/membership/membership.controller.js');

const jwtAuth = require('../../middleware/auth/jwtAuth.js');
const { upload } = require('../../middleware/upload/upload.js');


const MembershipRoute = Router();
// MembershipRoute.use(jwtAuth('admin', 'user', 'agent'));
MembershipRoute
  .post('/success', controller.addAmountSuccess)
  .post('/fail', controller.addAmountFail)
  .post('/cancel', controller.addAmountCancel);
// MembershipRoute
//   .post('/payment',jwtAuth('admin', 'user', 'agent'), controller.paymentBooking)
MembershipRoute
  .post('/',jwtAuth('admin', 'user', 'agent'), upload.any(), controller.paymentMembership)
  .get('/', controller.getAllMembership)
  .get('/find', controller.getFindMembership)
  .get('/find/:memberId', controller.getFindMembershipMemberId)
  .get('/user/:id', controller.getSingleMembershipByUserId)
  .get('/pagination', controller.getAllMembershipWithPagination);

MembershipRoute
  .route('/:id')
  // .get(controller.getSingleMembership)
  .put(jwtAuth('admin', 'user', 'agent'), upload.any(), controller.updateMembership)
  .delete(controller.deleteMembership);

  module.exports = MembershipRoute;
