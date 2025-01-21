
const { MembershipInfoSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class MembershipInfoRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createMembershipInfo(payload, session) {
    await this.#model.deleteMany({}, { session });

    const newMembershipInfo = await this.#model.create([payload], { session });

    return newMembershipInfo;
  }

  async updateMembershipInfo(id, payload) {
    const updatedMembershipInfo = await this.#model.findByIdAndUpdate(id, payload);
    return updatedMembershipInfo;
  }
}

module.exports = new MembershipInfoRepository(MembershipInfoSchema);

