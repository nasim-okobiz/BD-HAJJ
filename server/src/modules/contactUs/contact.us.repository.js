const { ContactUsSchema } = require("../../models/index.js");
const BaseRepository = require("../base/base.repository.js");



class ContactUsRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createContactUs(payload) {
    const newContactUs = await this.#model.create(payload);
    return newContactUs;
  }

 async updateContactUs(id, payload) {
   const updatedContactUs = await this.#model.findByIdAndUpdate(id, payload);
   return updatedContactUs;
 }
}

module.exports = new ContactUsRepository(ContactUsSchema);

