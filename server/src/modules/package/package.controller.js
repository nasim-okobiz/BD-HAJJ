const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const PackageService = require("./package.service.js");


class PackageController {
  //
  createPackage = withTransaction(async (req, res, next, session) => {


    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      packageRef: req.body.packageRef,
      name: req.body.name,
      title: req.body.title,
      discount: req.body.discount,
      discountType: req.body.discountType,
      validDate: req.body.validDate,
      earlyBird: req.body.earlyBird,
      price: req.body.price,
      minPayPrice: req.body.minPayPrice,
      roomType: req.body.roomType,
      hotalDistance: req.body.hotalDistance,
      packageIncludes: req.body.packageIncludes,
      packageExcludes: req.body.packageExcludes,
      documentsRequired: req.body.documentsRequired,
      bookingPolicy: req.body.bookingPolicy,
      termsAndConditions: req.body.termsAndConditions
    };

    const packageResult = await PackageService.createPackage(
      payloadFiles,
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "Package Created successfully",
      packageResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllPackage = catchError(async (req, res, next) => {
    const payload = {
      priority: req.query.priority,
    }
    const packageResult = await PackageService.getAllPackage(payload);
    const resDoc = responseHandler(200, "Get All Packages", packageResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getAllPackageWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
      packageRef: req.query.packageRef
    }
    const packages = await PackageService.getAllPackageWithPagination(payload);
    const resDoc = responseHandler(200, 'Packages get successfully', packages);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSinglePackage = catchError(async (req, res, next) => {
    const id = req.params.id;
    const packageResult = await PackageService.getSinglePackage(id);
    const resDoc = responseHandler(200, "Get Single Package", packageResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllPackageWithGroup = catchError(async (req, res, next) => {
    const packageResult = await PackageService.getAllPackageWithGroup();
    const resDoc = responseHandler(200, "Get All Packages With Group", packageResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  updatePackage = catchError(async (req, res, next) => {
    const id = req.params.id;

    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      packageRef: req.body.packageRef,
      name: req.body.name,
      title: req.body.title,
      discount: req.body.discount,
      discountType: req.body.discountType,
      validDate: req.body.validDate,
      earlyBird: req.body.earlyBird,
      price: req.body.price,
      minPayPrice: req.body.minPayPrice,
      roomType: req.body.roomType,
      hotalDistance: req.body.hotalDistance,
      packageIncludes: req.body.packageIncludes,
      packageExcludes: req.body.packageExcludes,
      documentsRequired: req.body.documentsRequired,
      bookingPolicy: req.body.bookingPolicy,
      termsAndConditions: req.body.termsAndConditions
    };
    const packageResult = await PackageService.updatePackage(id, payloadFiles, payload);
    const resDoc = responseHandler(201, "Package Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  updateStatusPackage = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const packageResult = await PackageService.updateStatusPackage(id, status);
    const resDoc = responseHandler(201, "Package Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deletePackage = catchError(async (req, res, next) => {
    const id = req.params.id;
    const packageResult = await PackageService.deletePackage(id);
    const resDoc = responseHandler(200, "Package Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new PackageController();

