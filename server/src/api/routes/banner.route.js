const { Router } = require('express');
const controller = require('../../modules/banner/banner.controller.js');
const jwtAuth = require('../../middleware/auth/jwtAuth.js');
const { upload } = require('../../middleware/upload/upload.js');
// const { upload } = require('../../middleware/upload');


const BannerRoute = Router();

// Uncomment the line below if JWT authentication is required
// BannerRoute.use(jwtAuth());

BannerRoute
  .post('/', upload.any(), controller.createBanner)
  .get('/', controller.getAllBanner);

BannerRoute
  .route('/:id')
  .put(upload.any(), controller.updateBanner)
  .delete(controller.deleteBanner);

BannerRoute
  .put('/status/:id', controller.updateStatusBanner);

module.exports = BannerRoute;
