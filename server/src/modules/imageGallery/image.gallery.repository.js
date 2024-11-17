const { ImageGallerySchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class ImageGalleryRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createImageGallery(payload) {
    const newTransaction = await this.#model.create(payload);
    return newTransaction;
  }

 async updateImageGallery(id, payload) {
   const updatedTransaction = await this.#model.findByIdAndUpdate(id, payload);
   return updatedTransaction;
 }

 async getAllImageGalleryWithPagination(payload) {
  try {
    const imageGallerys = await pagination(payload, async (limit, offset, sortOrder) => {
      const imageGallerys = await this.#model.find({
      })
        .sort({ createdAt: sortOrder , }) 
        .skip(offset)
        .limit(limit)
        // .populate('') 
        // .populate('') 


      // Count total documents
      const totalImageGallery = await this.#model.countDocuments();

      return { doc: imageGallerys, totalDoc: totalImageGallery };
    });

    return imageGallerys;
  } catch (error) {
    console.error("Error getting imageGallerys with pagination:", error);
    throw error;
  }
}
 
}

module.exports = new ImageGalleryRepository(ImageGallerySchema);

