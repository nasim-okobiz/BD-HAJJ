// const { AboutUsSchema } = require("../../models/index.js");
const { AboutUsSchema } = require("../../models/index.js");
const BaseRepository = require("../base/base.repository.js");


class AboutUsRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createAboutUs(payload, session) {
    const existingAboutUs = await this.#model.find({}, null, { session }).sort({ createdAt: -1 }); ;
    const deleteResult = await this.#model.deleteMany({}, { session });
    if (deleteResult.deletedCount > 0) {
      for (const aboutUs of existingAboutUs) {
        if (aboutUs.photo) {
          try {
            await removeUploadFile(aboutUs.photo); 
          } catch (fileError) {
            console.error(`Failed to remove file: ${aboutUs.photo}`, fileError);
          }
        }
      }
    }

    const newAboutUs = await this.#model.create([payload], { session });
    return newAboutUs;
  }

  async updateAboutUs(id, payload) {
    const updatedAboutUs = await this.#model.findByIdAndUpdate(id, payload);
    if (!updatedAboutUs) {
      throw new Error('About Us not found');
    }
    return updatedAboutUs;
  }
}

module.exports = new AboutUsRepository(AboutUsSchema);

