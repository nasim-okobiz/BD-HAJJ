const { convertFileNameWithPdfExt } = require("../../middleware/upload/convertFileNameWithPdfExt.js");
const { convertFileNameWithWebpExt } = require("../../middleware/upload/convertFileNameWithWebpExt.js");
const { convertImgArrayToObject } = require("../../middleware/upload/convertImgArrayToObject.js");
const { uploadWorker } = require("../../middleware/upload/uploadWorker.js");
const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const isArrayElementExist = require("../../utils/isArrayElementExist.js");
const joinUsRepository = require("./join.us.repository.js");
const { isMainThread } = require("worker_threads");
const { removeUploadFile } = require("../../middleware/upload/removeUploadFile.js");


class JoinUsService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createJoinUs( payload) {
    const { title, description,
      condition, amount,videoUrl } = payload;
    if (!title || !description || !condition || !amount || !videoUrl) throw new Error("Please provide required information");
    const joinUsData = await this.#repository.createJoinUs(payload);
    return joinUsData;
  }

  async getAllJoinUs() {
    return await this.#repository.findAll();
  }

  async updateJoinUs(id, payload) {
    const { title, description,
      condition, amount, videoUrl } = payload;
    if (!title || !description || !condition || !amount || !videoUrl) throw new Error("Please provide required information");
    const joinUsData = await this.#repository.updateJoinUs(id, payload);
    if (!joinUsData) throw new NotFoundError("JoinUs data not found");
    return joinUsData;

  }

  async updateStatusJoinUs(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const joinUs = await this.#repository.updateStatus(id, { status: status });
    if (!joinUs) throw new NotFoundError("JoinUs not found");
    return joinUs;
  }

  async deleteJoinUs(id) {
    const deletedJoinUs = await this.#repository.deleteById(id);
    if (!deletedJoinUs) throw new NotFoundError("JoinUs not found");
    return deletedJoinUs;
  }
}

module.exports = new JoinUsService(joinUsRepository, "joinUs");

