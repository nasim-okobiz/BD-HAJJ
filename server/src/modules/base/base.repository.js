class BaseRepository {
  #model;
  constructor(model) {
    this.#model = model;
  }

  async create(item, session) { 
    return await this.#model.create(item, session);
  }

  async findAll(filter = {}, populateFields = [], excludeFields = {}) {
    let query = this.#model.find(filter).sort({ createdAt: -1 });

    // Apply population with field exclusion if fields are specified
    if (populateFields.length > 0) {
      populateFields.forEach((field) => {
        const options = excludeFields[field] ? { select: excludeFields[field] } : {};
        query = query.populate({ path: field, ...options });
      });
    }

    const results = await query;
    return results;
  }

  async findOne(filter = {}, populateFields = [], excludeFields = {}) {
    let query = this.#model.findOne(filter);

    // Apply population with field exclusion if fields are specified
    if (populateFields.length > 0) {
      populateFields.forEach((field) => {
        const options = excludeFields[field] ? { select: excludeFields[field] } : {};
        query = query.populate({ path: field, ...options });
      });
    }

    const results = await query;
    return results;
  }

  async findById(id, populateFields = []) { 
    let query = this.#model.findById(id);
    if (populateFields.length > 0) {
      populateFields.forEach((field) => {
        query = query.populate(field);
      });
    }
    const results = await query;
    return results;
  }

  async updateById(id, updatedData, session) {
    return await this.#model.updateOne({ _id: id }, { $set: updatedData });
  }

  async deleteById(id) { 
    return await this.#model.findByIdAndDelete(id);
  }

  async updateStatus(id, status) {
    return await this.#model.findByIdAndUpdate(id, { status: status.status }, { new: true });
  }
}

module.exports = BaseRepository;

