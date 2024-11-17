const { PackageSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class PackageRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createPackage(payload) {
    const packageData = await this.#model.create(payload);
    return packageData;
  }

  async updatePackage(id, payload) {
    console.log(payload)
    const packageData = await this.#model.findByIdAndUpdate(id, payload);
    return packageData;
  }
 async earlyBirdPackageExists(packageRef){
   const packageData = await this.#model.findOne({ earlyBird: true, packageRef });
   return packageData;
 }
 async earlyBirdPackageExistsWithOutThisId(id, packageRef){
   const packageData = await this.#model.findOne({ earlyBird: true, packageRef, _id: { $ne: id } });
   return packageData;
 }
  async getAllPackage(payload) {
    const { priority } = payload;
    console.log(priority); 
    try {
        const aggregationPipeline = [
            {
                $lookup: {
                    from: 'packagetypes', 
                    localField: 'packageRef',
                    foreignField: '_id',
                    as: 'packageRef',
                },
            },
            {
                $unwind: '$packageRef',
            },
        ];

        if (priority !== undefined) {
            aggregationPipeline.push({
                $match: {
                    'packageRef.priority': Number(priority), 
                },
            });
        }

        const packages = await this.#model.aggregate(aggregationPipeline);
        return packages;
    } catch (error) {
        console.error("Error fetching packages:", error);
        throw error;
    }
}


  async getAllPackageWithPagination(payload) {
    try {
      const {packageRef}  = payload;
      const packages = await pagination(payload, async (limit, offset, sortOrder) => {
        const query = {};
        if (packageRef) {
            query.packageRef = packageRef; 
        }
        const packages = await this.#model.find(query)
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
          .populate('packageRef')
        // .populate('') 


        // Count total documents
        const totalPackage = await this.#model.countDocuments();

        return { doc: packages, totalDoc: totalPackage };
      });

      return packages;
    } catch (error) {
      console.error("Error getting packages with pagination:", error);
      throw error;
    }
  }

  async getAllPackageWithGroup(packageTypes) {
    console.log("Getting all packages", packageTypes);
    try {
  
      const packageTypeMap = packageTypes.reduce((acc, type) => {
        const refId = type._id.toString(); 
        acc[refId] = {
          packageType: type.name, 
          id: refId,
          packages: [] 
        };
        return acc;
      }, {});

      const packageTypeIds = packageTypes.map(type => type._id);
      const packages = await this.#model.find({
        "packageRef": { $in: packageTypeIds } 
      }).populate("packageRef").sort({ createdAt: -1 }); ;
  
      packages.forEach(pkg => {
        const refId = pkg.packageRef._id.toString(); 
        if (packageTypeMap[refId]) {
          packageTypeMap[refId].packages.push({
            name: pkg.name, 
            id: pkg._id 
          });
        }
      });
      const result = Object.values(packageTypeMap);
  
      return result;
    } catch (error) {
      console.error("Error getting packages:", error);
      throw error;
    }
  }
  
  
  
}

module.exports = new PackageRepository(PackageSchema);
