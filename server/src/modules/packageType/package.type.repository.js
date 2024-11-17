const { PackageTypeSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class PackageTypeRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }
  // priorityExits(priority, id)

  async priorityExits(priority, id){
    // if id come than id whise other wise  only priority wise 
    if(id){
      return await this.#model.findOne({ priority, _id: { $ne: id } });
    }else{
      return await this.#model.findOne({ priority });
    }
  }

  async createPackageType(payload) {
    const newTransaction = await this.#model.create(payload);
    return newTransaction;
  }

 async updatePackageType(id, payload) {
   const updatedTransaction = await this.#model.findByIdAndUpdate(id, payload);
   return updatedTransaction;
 }

 async getAllPackageTypeWithPagination(payload) {
  try {
    const packageTypes = await pagination(payload, async (limit, offset, sortOrder) => {
      const packageTypes = await this.#model.find({
      })
        .sort({ createdAt: sortOrder , }) 
        .skip(offset)
        .limit(limit)
        // .populate('') 
        // .populate('') 


      // Count total documents
      const totalPackageType = await this.#model.countDocuments();

      return { doc: packageTypes, totalDoc: totalPackageType };
    });

    return packageTypes;
  } catch (error) {
    console.error("Error getting packageTypes with pagination:", error);
    throw error;
  }
}

}

module.exports = new PackageTypeRepository(PackageTypeSchema);

