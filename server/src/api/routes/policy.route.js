const { Router } = require('express');
const controller = require('../../modules/policy/policy.controller.js');
const jwtAuth = require('../../middleware/auth/jwtAuth.js');

const PolicyRoute = Router();
// PolicyRoute.use(jwtAuth());
PolicyRoute
  .post('/privacy-policy', controller.createPrivacyPolicy)
  .get('/privacy-policy', controller.getPrivacyPolicy)
PolicyRoute
  .route('/privacy-policy/:id')
  .put( controller.updatePrivacyPolicy) 
  .delete(controller.deletePrivacyPolicy);


  PolicyRoute
  .post('/refund-policy', controller.createRefundPolicy)
  .get('/refund-policy', controller.getRefundPolicy)
PolicyRoute
  .route('/refund-policy/:id')
  .put( controller.updateRefundPolicy) 
  .delete(controller.deleteRefundPolicy);


  PolicyRoute
  .post('/terms-conditions', controller.createtermsAndConditions)
  .get('/terms-conditions', controller.gettermsAndConditions)
PolicyRoute
  .route('/terms-conditions/:id')
  .put( controller.updatetermsAndConditions) 
  .delete(controller.deletetermsAndConditions);


  module.exports = PolicyRoute;

