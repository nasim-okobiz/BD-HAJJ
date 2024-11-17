const { ContactInfoSchema } = require("../../models/index.js");
const BaseRepository = require("../base/base.repository.js");


class ContactInfoRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createContactInfo(payload, session) {
    await this.#model.deleteMany({}, { session }); 
    const newContactInfo = await this.#model.create([payload], { session }); 
    return newContactInfo;
  }
  

 async updateContactInfo(id, payload) {
   const updatedContactInfo = await this.#model.findByIdAndUpdate(id, payload);
   return updatedContactInfo;
 }
}

module.exports = new ContactInfoRepository(ContactInfoSchema);

