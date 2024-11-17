const { videoGallerySchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class VideoGalleryRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createVideoGallery(payload, session) {
    // DEETE ALL THE
    await this.#model.deleteMany({}, { session });
    const newTransaction = await this.#model.create([payload], { session });
    return newTransaction;
  }

  async updateVideoGallery(id, payload) {
    const updatedTransaction = await this.#model.findByIdAndUpdate(id, payload);
    return updatedTransaction;
  }

  async getAllVideoGalleryWithPagination(payload) {
    try {
      const videoGallerys = await pagination(payload, async (limit, offset, sortOrder) => {
        const videoGallerys = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 


        // Count total documents
        const totalVideoGallery = await this.#model.countDocuments();

        return { doc: videoGallerys, totalDoc: totalVideoGallery };
      });

      return videoGallerys;
    } catch (error) {
      console.error("Error getting videoGallerys with pagination:", error);
      throw error;
    }
  }

}

module.exports = new VideoGalleryRepository(videoGallerySchema);

