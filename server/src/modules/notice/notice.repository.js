
const { NoticeSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class NoticeRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createNotice(payload, session) {
    await this.#model.deleteMany({}, { session });
    console.log("first privacy notice", payload)
    const newNotice = await this.#model.create([payload], { session });

    return newNotice;
  }

  async updateNotice(id, payload) {
    const updatedNotice = await this.#model.findByIdAndUpdate(id, payload);
    return updatedNotice;
  }
}

module.exports = new NoticeRepository(NoticeSchema);

