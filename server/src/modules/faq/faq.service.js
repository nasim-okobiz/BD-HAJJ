const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const faqRepository = require("./faq.repository.js");



class FAQService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createFAQ(payload) {
    const { title, details } = payload;
    if (!title || !details) throw new Error("Please provide a title and details");
    const faqData = await this.#repository.createFAQ(payload);
    return faqData;
  }

  async getAllFAQ() {
    return await this.#repository.findAll({ status: true });
  }
  async getAllFAQWithPagination(payload) {
    const faq = await this.#repository.getAllFAQWithPagination(payload);
    return faq;
  }
  async updateFAQ(id, payload) {
    const { title, details } = payload;
    if (!title || !details) throw new Error("Please provide a title and details");
    const faqData = await this.#repository.updateFAQ(id, payload);
    if (!faqData) throw new NotFoundError("FAQ data not found");
    return faqData;

  }

  async updateStatusFAQ(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const faq = await this.#repository.updateStatus(id, { status: status });
    if (!faq) throw new NotFoundError("FAQ not found");
    return faq;
  }

  async deleteFAQ(id) {
    const deletedFAQ = await this.#repository.deleteById(id);
    if (!deletedFAQ) throw new NotFoundError("FAQ not found");
    return deletedFAQ;
  }
}

module.exports = new FAQService(faqRepository, "faq");
