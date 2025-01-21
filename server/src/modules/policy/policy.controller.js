const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const PolicyService = require("./policy.service.js");


class PolicyController {
  //
  createPrivacyPolicy = withTransaction(async (req, res, next, session) => {

    const payload = {
      details: req?.body?.details
    };
    const policyResult = await PolicyService.createPrivacyPolicy(payload, session);
    const resDoc = responseHandler(201, "Privacy Policy Created successfully", policyResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  getPrivacyPolicy = catchError(async (req, res, next) => {
    const policyResult = await PolicyService.getPrivacyPolicy();
    const resDoc = responseHandler(200, "Get Privacy Policys", policyResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  updatePrivacyPolicy = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payload = {
      details: req?.body?.details
    };
    const policyResult = await PolicyService.updatePrivacyPolicy(id, payload);
    const resDoc = responseHandler(201, "Policy Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deletePrivacyPolicy = catchError(async (req, res, next) => {
    const id = req.params.id;
    const policyResult = await PolicyService.deletePrivacyPolicy(id);
    const resDoc = responseHandler(200, "Policy Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  //
  createRefundPolicy = withTransaction(async (req, res, next, session) => {

    const payload = {
      details: req?.body?.details
    };
    const policyResult = await PolicyService.createRefundPolicy(payload, session);
    const resDoc = responseHandler(201, "Refund Policy Created successfully", policyResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  getRefundPolicy = catchError(async (req, res, next) => {
    const policyResult = await PolicyService.getRefundPolicy();
    const resDoc = responseHandler(200, "Get Refund Policys", policyResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  updateRefundPolicy = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payload = {
      details: req?.body?.details
    };
    const policyResult = await PolicyService.updateRefundPolicy(id, payload);
    const resDoc = responseHandler(201, "Policy Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteRefundPolicy = catchError(async (req, res, next) => {
    const id = req.params.id;
    const policyResult = await PolicyService.deleteRefundPolicy(id);
    const resDoc = responseHandler(200, "Policy Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  // termsAndConditions
  createtermsAndConditions = withTransaction(async (req, res, next, session) => {

    const payload = {
      details: req?.body?.details
    };
    const policyResult = await PolicyService.createtermsAndConditions(payload, session);
    const resDoc = responseHandler(201, "terms And Conditions Created successfully", policyResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  gettermsAndConditions = catchError(async (req, res, next) => {
    const policyResult = await PolicyService.gettermsAndConditions();
    const resDoc = responseHandler(200, "Get Refund Policys", policyResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  updatetermsAndConditions = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payload = {
      details: req?.body?.details
    };
    const policyResult = await PolicyService.updatetermsAndConditions(id, payload);
    const resDoc = responseHandler(201, "Policy Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deletetermsAndConditions = catchError(async (req, res, next) => {
    const id = req.params.id;
    const policyResult = await PolicyService.deletetermsAndConditions(id);
    const resDoc = responseHandler(200, "Policy Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new PolicyController();

