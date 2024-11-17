const { Router } = require('express');
const controller = require('../../modules/imageGallery/image.gallery.controller.js');
const jwtAuth = require('../../middleware/auth/jwtAuth.js');
const { upload } = require('../../middleware/upload/upload.js');


const ImageGalleryRoute = Router();
// ImageGalleryRoute.use(jwtAuth());
ImageGalleryRoute
  .post('/',upload.any(), controller.createImageGallery)
  .get('/', controller.getAllImageGallery)
  .get('/pagination', controller.getAllImageGalleryWithPagination); 

ImageGalleryRoute
  .route('/:id')
  // .get(controller.getSingleImageGallery)
  .put(upload.any(), controller.updateImageGallery) 
  .delete(controller.deleteImageGallery);
ImageGalleryRoute
  .put('/status/:id', controller.updateStatusImageGallery)
  .get('/type/:type', controller.getTypeByImageGallery)

  module.exports = ImageGalleryRoute;

