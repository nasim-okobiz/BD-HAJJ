const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const contactUsRepository = require("./contact.us.repository.js");


class ContactUsService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createContactUs(payload) {
    console.log("payload: ", payload)
    const { name, phone, email, subject, massage } = payload;
    if (phone?.length!== 11) throw new Error("Phone number should be 11 digits");
    if (!name || !phone || !subject || !massage) throw new Error("Please provide required information");
    const contactUsData = await this.#repository.createContactUs(payload);
    return contactUsData;
  }

  async getAllContactUs() {
    return await this.#repository.findAll();
  }

  async updateContactUs(id, payload) {
    const { name, phone, email, subject, massage } = payload;
    if (phone?.length!== 11) throw new Error("Phone number should be 11 digits");
    if (!name || !phone || !subject || !massage) throw new Error("Please provide required information");
    const contactUsData = await this.#repository.updateContactUs(id, payload);
    if (!contactUsData) throw new NotFoundError("ContactUs data not found");
    return contactUsData;

  }

  async updateStatusContactUs(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const contactUs = await this.#repository.updateStatus(id, { status: status });
    if (!contactUs) throw new NotFoundError("ContactUs not found");
    return contactUs;
  }

  async deleteContactUs(id) {
    const deletedContactUs = await this.#repository.deleteById(id);
    if (!deletedContactUs) throw new NotFoundError("ContactUs not found");
    return deletedContactUs;
  }
}

module.exports = new ContactUsService(contactUsRepository, "contactUs");
