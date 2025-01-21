const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const membershipParameterRepository = require("./membership.parameter.repository.js");

class MembershipParameterService extends BaseService {
  #repository;

  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;

  }
  //
  async createMembershipParameter(payload, session) {
    const { particular, diamoan,
      gold, silver } = payload;
    if (!particular, !diamoan, !gold, !silver) throw new Error("Please provide membershipParameter");
    const membershipParameterData = await this.#repository.createMembershipParameter(payload, session);
    return membershipParameterData;
  }
  async getMembershipParameter() {
    return await this.#repository.findAll();
  }
  async updateMembershipParameter(id, payload) {
    const { particular, diamoan,
      gold, silver } = payload;
    if (!particular, !diamoan, !gold, !silver) throw new Error("Please provide membershipParameter");
    const membershipParameterData = await this.#repository.updateMembershipParameter(id, payload);
    if (!membershipParameterData) throw new NotFoundError("MembershipParameter not found");
    return membershipParameterData;

  }
  async deleteMembershipParameter(id) {
    const deletedMembershipParameter = await this.#repository.deleteById(id);
    if (!deletedMembershipParameter) throw new NotFoundError("MembershipParameter not found");
    return deletedMembershipParameter;
  }

}

module.exports = new MembershipParameterService(membershipParameterRepository, "membershipParameter");
