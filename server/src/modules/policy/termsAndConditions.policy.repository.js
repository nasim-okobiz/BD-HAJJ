

const { TermsAndConditionsSchema } = require("../../models/policy/terms&Conditions.jsx");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class TermsAndConditionsRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createtermsAndConditions(payload, session) {

    await this.#model.deleteMany({}, { session });
    console.log("first refund policy", payload)
    const newPolicy = await this.#model.create([payload], { session });

    return newPolicy;
  }

  async updatetermsAndConditions(id, payload) {
    const updatedPolicy = await this.#model.findByIdAndUpdate(id, payload);
    return updatedPolicy;
  }
}

module.exports = new TermsAndConditionsRepository(TermsAndConditionsSchema);

