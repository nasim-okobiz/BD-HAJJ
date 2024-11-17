const { PersonSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class PersonRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createPerson(payload, session) {
    const newPerson = await this.#model.create([payload], { session });
    return newPerson;

  }

  async updatePerson(id, payload) {
    const updatedPerson = await this.#model.findByIdAndUpdate(id, payload);
    return updatedPerson;
  }
  async getCategoryWisePerson(id) {
    return this.#model.find({ personCategoryRef: id }).populate('personCategoryRef');
  }

  async getAllPersonWithPagination(payload) {
    try {
      const persons = await pagination(payload, async (limit, offset, sortOrder) => {
        const persons = await this.#model.find()
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 


        // Count total documents
        const totalPerson = await this.#model.countDocuments();

        return { doc: persons, totalDoc: totalPerson };
      });

      return persons;
    } catch (error) {
      console.error("Error getting persons with pagination:", error);
      throw error;
    }
  }
}

module.exports = new PersonRepository(PersonSchema);

