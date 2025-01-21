const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const JoinUsService = require("./join.us.service.js");


class JoinUsController {
  //
  createJoinUs = withTransaction(async (req, res, next, session) => {

    const payload = {
      title: req?.body?.title,
      description: req?.body?.description,
      condition: req?.body?.condition,
      amount: req?.body?.amount,
      videoUrl: req?.body?.videoUrl
    };
    const joinUsResult = await JoinUsService.createJoinUs(payload, session);
    const resDoc = responseHandler(201, "JoinUs Created successfully", joinUsResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllJoinUs = catchError(async (req, res, next) => {
    const joinUsResult = await JoinUsService.getAllJoinUs();
    const resDoc = responseHandler(200, "Get All JoinUss", joinUsResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  updateJoinUs = catchError(async (req, res, next) => {

    // id 
    const id = req.params.id;

    const payload = {
      title: req?.body?.title,
      description: req?.body?.description,
      condition: req?.body?.condition,
      amount: req?.body?.amount,
      videoUrl: req?.body?.videoUrl,
    };
    const joinUsResult = await JoinUsService.updateJoinUs(id, payload);
    const resDoc = responseHandler(201, "JoinUs Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  updateStatusJoinUs = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const joinUsResult = await JoinUsService.updateStatusJoinUs(id, status);
    const resDoc = responseHandler(201, "JoinUs Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteJoinUs = catchError(async (req, res, next) => {
    const id = req.params.id;
    const joinUsResult = await JoinUsService.deleteJoinUs(id);
    const resDoc = responseHandler(200, "JoinUs Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new JoinUsController();

