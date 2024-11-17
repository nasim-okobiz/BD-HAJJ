const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const contactInfoRepository = require("./contact.info.repository.js");


class ContactInfoService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createContactInfo(payload, session) {
    console.log("payload: ", payload)
    const { agencyName, address,
      email, phone, whatsapp } = payload;
    if (!agencyName || !address || !email || !phone || !whatsapp) throw new Error("Please provide required information");
    if (phone.some((phone) => phone.length !== 11)) throw new Error("Phone number should be 11 digits");
    if (whatsapp.some((whatsapp) => whatsapp.length !== 11)) throw new Error("WhatsApp number should be 11 digits");
    const contactInfoData = await this.#repository.createContactInfo(payload, session);
    return contactInfoData;
  }

  async getAllContactInfo() {
    return await this.#repository.findAll();
  }

  async updateContactInfo(id, payload) {
    const { agencyName, address,
      email, phone, whatsapp } = payload;
    if (!agencyName || !address || !email || !phone || !whatsapp) throw new Error("Please provide required information");
    if (phone.some((phone) => phone.length !== 11)) throw new Error("Phone number should be 11 digits");
    if (whatsapp.some((whatsapp) => whatsapp.length !== 11)) throw new Error("WhatsApp number should be 11 digits");
    const contactInfoData = await this.#repository.updateContactInfo(id, payload);
    if (!contactInfoData) throw new NotFoundError("ContactInfo data not found");
    return contactInfoData;

  }

  async updateStatusContactInfo(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const contactInfo = await this.#repository.updateStatus(id, { status: status });
    if (!contactInfo) throw new NotFoundError("ContactInfo not found");
    return contactInfo;
  }

  async deleteContactInfo(id) {
    const deletedContactInfo = await this.#repository.deleteById(id);
    if (!deletedContactInfo) throw new NotFoundError("ContactInfo not found");
    return deletedContactInfo;
  }
}

module.exports = new ContactInfoService(contactInfoRepository, "contactInfo");

