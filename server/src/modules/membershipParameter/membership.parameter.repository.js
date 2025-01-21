
const { MembershipParameterSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class MembershipParameterRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createMembershipParameter(payload, session) {
    // await this.#model.deleteMany({}, { session });

    const newMembershipParameter = await this.#model.create([payload], { session });

    return newMembershipParameter;
  }

  async updateMembershipParameter(id, payload) {
    const updatedMembershipParameter = await this.#model.findByIdAndUpdate(id, payload);
    return updatedMembershipParameter;
  }
}

module.exports = new MembershipParameterRepository(MembershipParameterSchema);

