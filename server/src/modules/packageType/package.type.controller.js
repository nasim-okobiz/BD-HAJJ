const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const PackageTypeService = require("./package.type.service.js");


class PackageTypeController {
  //
  createPackageType = withTransaction(async (req, res, next, session) => {
    console.log(req.body);
    const payload = {
      name: req.body.name,
      priority: req.body.priority
    };
    const packageTypeResult = await PackageTypeService.createPackageType(
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "PackageType Created successfully",
      packageTypeResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllPackageType = catchError(async (req, res, next) => {
    const packageTypeResult = await PackageTypeService.getAllPackageType();
    const resDoc = responseHandler(200, "Get All PackageTypes", packageTypeResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getAllPackageTypeWithPagination = catchError(async (req, res, next) => {
    let payload={
			page: req.query.page,
			limit: req.query.limit,
			order: req.query.order,
		}
    const packageType = await PackageTypeService.getAllPackageTypeWithPagination(payload);
    const resDoc = responseHandler(200, 'PackageTypes get successfully', packageType);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updatePackageType = catchError(async (req, res, next) => {
    const id = req.params.id;
    console.log("id", id);
    const payload = {
      name: req?.body?.name,
      priority: req.body.priority
    };
    const packageTypeResult = await PackageTypeService.updatePackageType(id, payload);
    const resDoc = responseHandler(201, "PackageType Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  deletePackageType = catchError(async (req, res, next) => {
    const id = req.params.id;
    const packageTypeResult = await PackageTypeService.deletePackageType(id);
    const resDoc = responseHandler(200, "PackageType Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new PackageTypeController();

