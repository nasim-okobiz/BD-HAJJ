const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const privacyPolicyRepository = require("./privacy.policy.repository.js");
const policyRepository = require("./privacy.policy.repository.js");
const refundPolicyRepository = require("./refund.policy.repository.js");
const termsAndConditionsPolicyRepository = require("./termsAndConditions.policy.repository.js");



class PolicyService extends BaseService {
  #repository;
  #refundPolicyRepository;
  #termsAndConditionsPolicyRepository;
  constructor(repository,refundPolicyRepository,termsAndConditionsPolicyRepository, serviceName) {
    super(repository,refundPolicyRepository,termsAndConditionsPolicyRepository, serviceName);
    this.#repository = repository;
    this.#refundPolicyRepository = refundPolicyRepository;
    this.#termsAndConditionsPolicyRepository = termsAndConditionsPolicyRepository;
  }
//
  async createPrivacyPolicy(payload, session) {
    const {  details } = payload;
    if ( !details) throw new Error("Please provide details");
    const policyData = await this.#repository.createPrivacyPolicy(payload, session);
    return policyData;
  }
  async getPrivacyPolicy() {
    return await this.#repository.findAll();
  }
  async updatePrivacyPolicy(id, payload) {
    const {  details } = payload;
    if (!details) throw new Error("Please provide details");
    const policyData = await this.#repository.updatePrivacyPolicy(id, payload);
    if (!policyData) throw new NotFoundError("Privacy Policy data not found");
    return policyData;

  }
  async deletePrivacyPolicy(id) {
    const deletedPolicy = await this.#repository.deleteById(id);
    if (!deletedPolicy) throw new NotFoundError("Privacy Policy not found");
    return deletedPolicy;
  }

  //
  async createRefundPolicy(payload, session) {
    const {  details } = payload;
    if ( !details) throw new Error("Please provide details");
    const policyData = await this.#refundPolicyRepository.createRefundPolicy(payload, session);
    return policyData;
  }
  async getRefundPolicy() {
    return await this.#refundPolicyRepository.findAll();
  }
  async updateRefundPolicy(id, payload) {
    const {  details } = payload;
    if (!details) throw new Error("Please provide details");
    const policyData = await this.#refundPolicyRepository.updateRefundPolicy(id, payload);
    if (!policyData) throw new NotFoundError("Refund Policy data not found");
    return policyData;

  }
  async deleteRefundPolicy(id) {
    const deletedPolicy = await this.#refundPolicyRepository.deleteById(id);
    if (!deletedPolicy) throw new NotFoundError("Refund Policy not found");
    return deletedPolicy;
  }


    //
    async createtermsAndConditions(payload, session) {
      const {  details } = payload;
      if ( !details) throw new Error("Please provide details");
      const policyData = await this.#termsAndConditionsPolicyRepository.createtermsAndConditions(payload, session);
      return policyData;
    }
    async gettermsAndConditions() {
      return await this.#termsAndConditionsPolicyRepository.findAll();
    }
    async updatetermsAndConditions(id, payload) {
      const {  details } = payload;
      if (!details) throw new Error("Please provide details");
      const policyData = await this.#termsAndConditionsPolicyRepository.updatetermsAndConditions(id, payload);
      if (!policyData) throw new NotFoundError("termsAndConditions Policy data not found");
      return policyData;
  
    }
    async deletetermsAndConditions(id) {
      const deletedPolicy = await this.#termsAndConditionsPolicyRepository.deleteById(id);
      if (!deletedPolicy) throw new NotFoundError("termsAndConditions Policy not found");
      return deletedPolicy;
    }
}

module.exports = new PolicyService(privacyPolicyRepository, refundPolicyRepository,termsAndConditionsPolicyRepository, "policy");
