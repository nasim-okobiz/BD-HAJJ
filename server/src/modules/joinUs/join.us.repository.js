
const { JoinUsSchema } = require("../../models/index.js");
const BaseRepository = require("../base/base.repository.js");


class JoinUsRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createJoinUs(payload) {
    // delete existing
    await this.#model.deleteMany({});
    const newJoinUs = await this.#model.create(payload);
    return newJoinUs;
  }

 async updateJoinUs(id, payload) {
   const updatedJoinUs = await this.#model.findByIdAndUpdate(id, payload);
   return updatedJoinUs;
 }
}

module.exports = new JoinUsRepository(JoinUsSchema);

