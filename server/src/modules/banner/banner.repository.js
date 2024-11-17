const BaseRepository = require("../base/base.repository.js");
const { bannerSchema } = require("../../models/banner/banner.js");


class BannerRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createBanner(payload) {
    const newTransaction = await this.#model.create(payload);
    return newTransaction;
  }

 async updateBanner(id, payload) {
   const updatedTransaction = await this.#model.findByIdAndUpdate(id, payload);
   return updatedTransaction;
 }
}

module.exports = new BannerRepository(bannerSchema);

