const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const AboutUsService = require("./about.us.service.js");


class AboutUsController {
  //
  createAboutUs = withTransaction(async (req, res, next, session) => {

    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      header: req.body.header,
      title: req.body.title,
      description: req.body.description,
      agencyName: req.body.agencyName,
      honorName: req.body.honorName,
      whatsApp: req.body.whatsApp,
      email: req.body.email,
    }
    const aboutUsResult = await AboutUsService.createAboutUs(
      payloadFiles,
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "AboutUs Created successfully",
      aboutUsResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllAboutUs = catchError(async (req, res, next) => {
    const aboutUsResult = await AboutUsService.getAllAboutUs();
    const resDoc = responseHandler(200, "Get All AboutUss", aboutUsResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  updateAboutUs = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      header: req.body.header,
      title: req.body.title,
      description: req.body.description,
      agencyName: req.body.agencyName,
      honorName: req.body.honorName,
      whatsApp: req.body.whatsApp,
      email: req.body.email,
    }
    const aboutUsResult = await AboutUsService.updateAboutUs(id, payloadFiles, payload);
    const resDoc = responseHandler(201, "AboutUs Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteAboutUs = catchError(async (req, res, next) => {
    const id = req.params.id;
    const aboutUsResult = await AboutUsService.deleteAboutUs(id);
    const resDoc = responseHandler(200, "AboutUs Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new AboutUsController();

