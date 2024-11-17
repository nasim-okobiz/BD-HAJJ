const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const ImageGalleryService = require("./image.gallery.service.js");

class ImageGalleryController {
  //
  createImageGallery = withTransaction(async (req, res, next, session) => {
    console.log(req.body);
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      galleryType: req.body.galleryType?.trim()
    }
    const imageGalleryResult = await ImageGalleryService.createImageGallery(
      payloadFiles,
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "ImageGallery Created successfully",
      imageGalleryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllImageGallery = catchError(async (req, res, next) => {
    const imageGalleryResult = await ImageGalleryService.getAllImageGallery();
    const resDoc = responseHandler(200, "Get All ImageGallerys", imageGalleryResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getAllImageGalleryWithPagination = catchError(async (req, res, next) => {
    let payload={
			page: req.query.page,
			limit: req.query.limit,
			order: req.query.order,
		}
    const imageGallery = await ImageGalleryService.getAllImageGalleryWithPagination(payload);
    const resDoc = responseHandler(200, 'ImageGallerys get successfully', imageGallery);
    res.status(resDoc.statusCode).json(resDoc);
  });


  updateImageGallery = catchError(async (req, res, next) => {
    const id = req.params.id;
    console.log("id", id);
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      galleryType: req.body.galleryType?.trim()
    }
    const imageGalleryResult = await ImageGalleryService.updateImageGallery(id, payloadFiles, payload);
    const resDoc = responseHandler(201, "ImageGallery Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  updateStatusImageGallery = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const imageGalleryResult = await ImageGalleryService.updateStatusImageGallery(id, status);
    const resDoc = responseHandler(201, "ImageGallery Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  getTypeByImageGallery = catchError(async (req, res, next) => {

    const galleryType = req.params.type;
    const imageGalleryResult = await ImageGalleryService.getTypeByImageGallery(galleryType);
    const resDoc = responseHandler(200, "Get Type By ImageGallery", imageGalleryResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteImageGallery = catchError(async (req, res, next) => {
    const id = req.params.id;
    const imageGalleryResult = await ImageGalleryService.deleteImageGallery(id);
    const resDoc = responseHandler(200, "ImageGallery Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ImageGalleryController();

