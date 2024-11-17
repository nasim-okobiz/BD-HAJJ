const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const ContactInfoService = require("./contact.info.service.js");


class ContactInfoController {
  //
  createContactInfo = withTransaction(async (req, res, next, session) => {
    console.log(req.body);
    const payload = {
      agencyName: req?.body?.agencyName,
      address: req?.body?.address,
      email: req?.body?.email,
      phone: req?.body?.phone,
      whatsapp: req?.body?.whatsapp,
    };
    const contactInfoResult = await ContactInfoService.createContactInfo(payload, session);
    const resDoc = responseHandler(201, "ContactInfo Created successfully", contactInfoResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllContactInfo = catchError(async (req, res, next) => {
    const contactInfoResult = await ContactInfoService.getAllContactInfo();
    const resDoc = responseHandler(200, "Get All ContactInfos", contactInfoResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  updateContactInfo = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payload = {
      agencyName: req?.body?.agencyName,
      address: req?.body?.address,
      email: req?.body?.email,
      phone: req?.body?.phone,
      whatsapp: req?.body?.whatsapp,
    };
    const contactInfoResult = await ContactInfoService.updateContactInfo(id, payload);
    const resDoc = responseHandler(201, "ContactInfo Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  updateStatusContactInfo = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const contactInfoResult = await ContactInfoService.updateStatusContactInfo(id, status);
    const resDoc = responseHandler(201, "ContactInfo Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteContactInfo = catchError(async (req, res, next) => {
    const id = req.params.id;
    const contactInfoResult = await ContactInfoService.deleteContactInfo(id);
    const resDoc = responseHandler(200, "ContactInfo Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ContactInfoController();

