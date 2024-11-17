
const { PrivacyPolicySchema } = require("../../models/policy/privacyPolicy.jsx");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class PrivacyPolicyRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createPrivacyPolicy(payload, session) {
    await this.#model.deleteMany({}, { session });
    console.log("first privacy policy", payload)
    const newPolicy = await this.#model.create([payload], { session });

    return newPolicy;
  }

  async updatePrivacyPolicy(id, payload) {
    const updatedPolicy = await this.#model.findByIdAndUpdate(id, payload);
    return updatedPolicy;
  }
}

module.exports = new PrivacyPolicyRepository(PrivacyPolicySchema);

