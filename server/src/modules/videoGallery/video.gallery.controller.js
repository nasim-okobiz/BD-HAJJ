const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const VideoGalleryService = require("./video.gallery.service.js");


class VideoGalleryController {
  //
  createVideoGallery = withTransaction(async (req, res, next, session) => {
    console.log(req.body);
    const payload = {
      video: req.body.video,
    };
    const videoGalleryResult = await VideoGalleryService.createVideoGallery(payload,session);
    const resDoc = responseHandler(201,"VideoGallery Created successfully",videoGalleryResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllVideoGallery = catchError(async (req, res, next) => {
    const videoGalleryResult = await VideoGalleryService.getAllVideoGallery();
    const resDoc = responseHandler(200, "Get All VideoGallerys", videoGalleryResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getAllVideoGalleryWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    }
    const videoGallery = await VideoGalleryService.getAllVideoGalleryWithPagination(payload);
    const resDoc = responseHandler(200, 'VideoGallerys get successfully', videoGallery);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateVideoGallery = catchError(async (req, res, next) => {
    const id = req.params.id;
    console.log("id", id);
    const payload = {
      video: req?.body?.video
    };
    const videoGalleryResult = await VideoGalleryService.updateVideoGallery(id, payload);
    const resDoc = responseHandler(201, "VideoGallery Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  updateStatusVideoGallery = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const videoGalleryResult = await VideoGalleryService.updateStatusVideoGallery(id, status);
    const resDoc = responseHandler(201, "VideoGallery Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteVideoGallery = catchError(async (req, res, next) => {
    const id = req.params.id;
    const videoGalleryResult = await VideoGalleryService.deleteVideoGallery(id);
    const resDoc = responseHandler(200, "VideoGallery Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new VideoGalleryController();

