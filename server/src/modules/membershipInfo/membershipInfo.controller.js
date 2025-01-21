const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const MembershipInfoService = require("./membershipInfo.service.js");


class MembershipInfoController {

  createMembershipInfo = withTransaction(async (req, res, next, session) => {

    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      header: req?.body?.header,
      title: req?.body?.title,
      description: req?.body?.description,
      detail: req?.body?.detail,
    };
    const membershipInfoResult = await MembershipInfoService.createMembershipInfo(payloadFiles, payload, session);
    const resDoc = responseHandler(201, "MembershipInfo Created successfully", membershipInfoResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  getMembershipInfo = catchError(async (req, res, next) => {
    const membershipInfoResult = await MembershipInfoService.getMembershipInfo();
    const resDoc = responseHandler(200, "Get  MembershipInfos", membershipInfoResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  updateMembershipInfo = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      header: req?.body?.header,
      title: req?.body?.title,
      description: req?.body?.description,
      detail: req?.body?.detail,
    };
    const membershipInfoResult = await MembershipInfoService.updateMembershipInfo(id, payloadFiles, payload);
    const resDoc = responseHandler(201, "MembershipInfo Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteMembershipInfo = catchError(async (req, res, next) => {
    const id = req.params.id;
    const membershipInfoResult = await MembershipInfoService.deleteMembershipInfo(id);
    const resDoc = responseHandler(200, "MembershipInfo Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

}

module.exports = new MembershipInfoController();

