
const { RefundPolicySchema } = require("../../models/policy/refundPolicy.jsx");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class RefundPolicyRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createRefundPolicy(payload, session) {
    await this.#model.deleteMany({}, { session });

    const newPolicy = await this.#model.create([payload], { session });

    return newPolicy;
  }

  async updateRefundPolicy(id, payload) {
    const updatedPolicy = await this.#model.findByIdAndUpdate(id, payload);
    return updatedPolicy;
  }
}

module.exports = new RefundPolicyRepository(RefundPolicySchema);

