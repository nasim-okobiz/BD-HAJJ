const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const ContactUsService = require("./contact.us.service.js");

class ContactUsController {
  //
  createContactUs = withTransaction(async (req, res, next, session) => {

    const payload = {
      name: req?.body?.name,
      phone: req?.body?.phone,
      email: req?.body?.email,
      subject: req?.body?.subject,
      massage: req?.body?.massage,
    };
    const contactUsResult = await ContactUsService.createContactUs(payload, session);
    const resDoc = responseHandler(201, "ContactUs Created successfully", contactUsResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllContactUs = catchError(async (req, res, next) => {
    const contactUsResult = await ContactUsService.getAllContactUs();
    const resDoc = responseHandler(200, "Get All ContactUss", contactUsResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  updateContactUs = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payload = {
      name: req?.body?.name,
      phone: req?.body?.phone,
      email: req?.body?.email,
      subject: req?.body?.subject,
      massage: req?.body?.massage,
    };
    const contactUsResult = await ContactUsService.updateContactUs(id, payload);
    const resDoc = responseHandler(201, "ContactUs Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  updateStatusContactUs = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const contactUsResult = await ContactUsService.updateStatusContactUs(id, status);
    const resDoc = responseHandler(201, "ContactUs Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteContactUs = catchError(async (req, res, next) => {
    const id = req.params.id;
    const contactUsResult = await ContactUsService.deleteContactUs(id);
    const resDoc = responseHandler(200, "ContactUs Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ContactUsController();

