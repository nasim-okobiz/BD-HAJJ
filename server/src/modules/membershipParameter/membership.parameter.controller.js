const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const MembershipParameterService = require("./membership.parameter.service.js");


class MembershipParameterController {

  createMembershipParameter = withTransaction(async (req, res, next, session) => {

    const payload = {
      particular: req?.body?.particular,
      diamoan: req?.body?.diamoan,
      gold: req?.body?.gold,
      silver: req?.body?.silver,
    };
    const membershipParameterResult = await MembershipParameterService.createMembershipParameter(payload, session);
    const resDoc = responseHandler(201, "MembershipParameter Created successfully", membershipParameterResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  getMembershipParameter = catchError(async (req, res, next) => {
    const membershipParameterResult = await MembershipParameterService.getMembershipParameter();
    const resDoc = responseHandler(200, "Get  MembershipParameters", membershipParameterResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  updateMembershipParameter = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payload = {
      particular: req?.body?.particular,
      diamoan: req?.body?.diamoan,
      gold: req?.body?.gold,
      silver: req?.body?.silver,
    };
    const membershipParameterResult = await MembershipParameterService.updateMembershipParameter(id, payload);
    const resDoc = responseHandler(201, "MembershipParameter Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteMembershipParameter = catchError(async (req, res, next) => {
    const id = req.params.id;
    const membershipParameterResult = await MembershipParameterService.deleteMembershipParameter(id);
    const resDoc = responseHandler(200, "MembershipParameter Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

}

module.exports = new MembershipParameterController();

