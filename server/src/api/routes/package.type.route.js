const { Router } = require('express');
const controller = require('../../modules/packageType/package.type.controller.js');

const PackageTypeRoute = Router();
// PackageTypeRoute.use(jwtAuth());
PackageTypeRoute
  .post('/', controller.createPackageType)
  .get('/', controller.getAllPackageType)
  .get('/pagination', controller.getAllPackageTypeWithPagination);

PackageTypeRoute
  .route('/:id')
  // .get(controller.getSinglePackageType)
  .put( controller.updatePackageType)
  .delete(controller.deletePackageType);

  module.exports = PackageTypeRoute;
  ;
