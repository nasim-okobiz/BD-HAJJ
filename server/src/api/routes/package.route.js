const { Router } = require('express');
const controller = require('../../modules/package/package.controller.js');
const { upload } = require('../../middleware/upload/upload.js');


const PackageRoute = Router();
// PackageRoute.use(jwtAuth());
PackageRoute
  .post('/', upload.any(), controller.createPackage)
  .get('/', controller.getAllPackage)
  .get('/pagination', controller.getAllPackageWithPagination)
  .get('/group', controller.getAllPackageWithGroup);

PackageRoute
  .route('/:id')
  .get(controller.getSinglePackage)
  .put(upload.any(), controller.updatePackage)
  .delete(controller.deletePackage);

  module.exports = PackageRoute;

