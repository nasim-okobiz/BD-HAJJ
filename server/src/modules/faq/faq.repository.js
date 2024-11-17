const { FAQSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class FAQRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createFAQ(payload) {
    const newFAQ = await this.#model.create(payload);
    return newFAQ;
  }

  async updateFAQ(id, payload) {
    const updatedFAQ = await this.#model.findByIdAndUpdate(id, payload);
    return updatedFAQ;
  }

  async getAllFAQWithPagination(payload) {
    try {
      const faqs = await pagination(payload, async (limit, offset, sortOrder) => {
        const faqs = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 


        // Count total documents
        const totalfaq = await this.#model.countDocuments();

        return { doc: faqs, totalDoc: totalfaq };
      });

      return faqs;
    } catch (error) {
      console.error("Error getting faqs with pagination:", error);
      throw error;
    }
  }
}

module.exports = new FAQRepository(FAQSchema);

