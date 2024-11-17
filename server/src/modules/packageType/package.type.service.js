const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const packageTypeRepository = require("./package.type.repository.js");



class PackageTypeService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createPackageType(payload) {
    const { name, priority } = payload;
    if (!name || !name?.length || !priority) throw new Error("name and priority is required");
    const priorityExits = await this.#repository.priorityExits(priority);
    if (priorityExits) throw new Error("Priority already exists");
    const packageTypeData = await this.#repository.createPackageType(payload);
    return packageTypeData;
  }

  async getAllPackageType() {
    return await this.#repository.findAll({});
  }

  async getAllPackageTypeWithPagination(payload) {
    const packageType = await this.#repository.getAllPackageTypeWithPagination(payload);
    return packageType;
  }

  async updatePackageType(id, payload) {
    const { name, priority } = payload;
    if (!name || !name?.length || !priority) throw new Error("name and priority is required");
    const priorityExits = await this.#repository.priorityExits(priority, id);
    if (priorityExits) throw new Error("Priority already exists");

    const packageTypeData = await this.#repository.updatePackageType(id, payload);
    if (!packageTypeData) throw new NotFoundError("Package Type Not Found");
    return packageTypeData;

  }



  async deletePackageType(id) {
    const packageType = await this.#repository.findById(id);
    if (!packageType) throw new NotFoundError("PackageType not found");
    const deletedPackageType = await this.#repository.deleteById(id);
    return deletedPackageType;
  }
}

module.exports = new PackageTypeService(packageTypeRepository, "packageType");

