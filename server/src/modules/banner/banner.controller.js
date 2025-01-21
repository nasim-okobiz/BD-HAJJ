const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const BannerService = require("./banner.service.js");


class BannerController {
  //
  createBanner = withTransaction(async (req, res, next, session) => {

    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      packageRef: req.body.packageRef,
    };
    const bannerResult = await BannerService.createBanner(payloadFiles, payload, session);
    const resDoc = responseHandler(
      201,
      "Banner Created successfully",
      bannerResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllBanner = catchError(async (req, res, next) => {
    const bannerResult = await BannerService.getAllBanner();
    const resDoc = responseHandler(200, "Get All Banners", bannerResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  updateBanner = catchError(async (req, res, next) => {
    const id = req.params.id;

    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      packageRef: req.body.packageRef,
    };
    const bannerResult = await BannerService.updateBanner(id, payload, payloadFiles);
    const resDoc = responseHandler(201, "Banner Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  updateStatusBanner = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const bannerResult = await BannerService.updateStatusBanner(id, status);
    const resDoc = responseHandler(201, "Banner Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteBanner = catchError(async (req, res, next) => {
    const id = req.params.id;
    const bannerResult = await BannerService.deleteBanner(id);
    const resDoc = responseHandler(200, "Banner Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new BannerController();

