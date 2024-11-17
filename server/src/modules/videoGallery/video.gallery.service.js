const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const videoGalleryRepository = require("./video.gallery.repository.js");


class VideoGalleryService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createVideoGallery(payload, session) {
    const { video } = payload;

    if (!video || !video?.length) throw new Error("video link is required");
    const videoGalleryData = await this.#repository.createVideoGallery(payload, session);
    return videoGalleryData;
  }

  async getAllVideoGallery() {
    return await this.#repository.findAll({status: true});
  }

  async getAllVideoGalleryWithPagination(payload) {
    const videoGallery = await this.#repository.getAllVideoGalleryWithPagination(payload);
    return videoGallery;
  }

  async updateVideoGallery(id, payload) {
    const { video } = payload;
    console.log("video", video);

    if (!video || !video?.length) throw new Error("Video link is required");
    //update by id 
    const videoGalleryData = await this.#repository.updateVideoGallery(id, payload);
    if (!videoGalleryData) throw new NotFoundError("Video Gallery Not Found");
    
    return videoGalleryData;

  }

  async updateStatusVideoGallery(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const videoGallery = await this.#repository.updateStatus(id, { status: status });
    console.log("videoGallery", videoGallery);
    if (!videoGallery) throw new NotFoundError("VideoGallery not found");
    return videoGallery;
  }

  async deleteVideoGallery(id) {
    const videoGallery = await this.#repository.findById(id);
    if (!videoGallery) throw new NotFoundError("VideoGallery not found");
    const deletedVideoGallery = await this.#repository.deleteById(id);
    return deletedVideoGallery;
  }
}

module.exports = new VideoGalleryService(videoGalleryRepository, "videoGallery");

