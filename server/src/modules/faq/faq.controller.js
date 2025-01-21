const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const FAQService = require("./faq.service.js");


class FAQController {
  //
  createFAQ = withTransaction(async (req, res, next, session) => {

    const payload = {
      title: req?.body?.title,
      details: req?.body?.details
    };
    const faqResult = await FAQService.createFAQ(payload, session);
    const resDoc = responseHandler(201, "FAQ Created successfully", faqResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllFAQ = catchError(async (req, res, next) => {
    const faqResult = await FAQService.getAllFAQ();
    const resDoc = responseHandler(200, "Get All FAQs", faqResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getAllFAQWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    }
    const faqResult = await FAQService.getAllFAQWithPagination(payload);
    const resDoc = responseHandler(200, 'FAQs get successfully', faqResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateFAQ = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details
    };
    const faqResult = await FAQService.updateFAQ(id, payload);
    const resDoc = responseHandler(201, "FAQ Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  updateStatusFAQ = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const faqResult = await FAQService.updateStatusFAQ(id, status);
    const resDoc = responseHandler(201, "FAQ Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteFAQ = catchError(async (req, res, next) => {
    const id = req.params.id;
    const faqResult = await FAQService.deleteFAQ(id);
    const resDoc = responseHandler(200, "FAQ Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new FAQController();

