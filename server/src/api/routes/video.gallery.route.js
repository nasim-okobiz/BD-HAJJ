const { Router } = require('express');
const controller = require('../../modules/videoGallery/video.gallery.controller.js');
const jwtAuth = require('../../middleware/auth/jwtAuth.js');
const VideoGalleryRoute = Router();
// VideoGalleryRoute.use(jwtAuth());
VideoGalleryRoute
  .post('/', controller.createVideoGallery)
  .get('/', controller.getAllVideoGallery)
  .get('/pagination', controller.getAllVideoGalleryWithPagination); 

VideoGalleryRoute
  .route('/:id')
  // .get(controller.getSingleVideoGallery)
  .put( controller.updateVideoGallery)
  .delete(controller.deleteVideoGallery);
VideoGalleryRoute
  .put('/status/:id', controller.updateStatusVideoGallery)

  module.exports = VideoGalleryRoute;

