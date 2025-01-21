const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const NoticeService = require("./notice.service.js");


class NoticeController {
  //
  createNotice = withTransaction(async (req, res, next, session) => {

    const payload = {
      notice: req?.body?.notice
    };
    const noticeResult = await NoticeService.createNotice(payload, session);
    const resDoc = responseHandler(201, "Notice Created successfully", noticeResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  getNotice = catchError(async (req, res, next) => {
    const noticeResult = await NoticeService.getNotice();
    const resDoc = responseHandler(200, "Get  Notices", noticeResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  updateNotice = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payload = {
      notice: req?.body?.notice
    };
    const noticeResult = await NoticeService.updateNotice(id, payload);
    const resDoc = responseHandler(201, "Notice Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteNotice = catchError(async (req, res, next) => {
    const id = req.params.id;
    const noticeResult = await NoticeService.deleteNotice(id);
    const resDoc = responseHandler(200, "Notice Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

}

module.exports = new NoticeController();

