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

  async createJoinUs(payloadFiles, payload) {
    console.log("payload: ", payload)
    const { files } = payloadFiles;
    if (!files) throw new Error("Photo is required");
    let images;
    if (Array.isArray(files) && files.length > 0 && isMainThread) {
      // Map over the files and prepare them for upload
      const imgFile = files.map(({ buffer, originalname, fieldname, mimetype }) => ({
        buffer,
        originalname: 
          mimetype === "application/pdf"
            ? convertFileNameWithPdfExt(originalname)
            : convertFileNameWithWebpExt(originalname),
        fieldname,
        mimetype,
      }));
    
      console.log("imgFile", imgFile);
    
      // Handle the upload of each file
      for (let file of imgFile) {
        try {
          await uploadWorker(file);  // Assuming uploadWorker can handle one file at a time
        } catch (error) {
          console.error('Error uploading file:', error);
          throw new Error('File upload failed');
        }
      }
    
      // After upload, convert imgFile array to object format
      images = convertImgArrayToObject(imgFile);
    } else {
      throw new Error("Invalid or empty files array");
    }

    for (const key in images) {
      payload[key] = images[key];
    }
    const { title, description,
      condition, amount, } = payload;
    if (!title || !description || !condition || !amount) throw new Error("Please provide required information");
    const joinUsData = await this.#repository.createJoinUs(payload);
    return joinUsData;
  }

  async getAllJoinUs() {
    return await this.#repository.findAll();
  }

  async updateJoinUs(id, payloadFiles, payload) {
    const { files } = payloadFiles;
    console.log(files)

    if (files.length) {
      let images;
    console.log(files)

    if (Array.isArray(files) && files.length > 0 && isMainThread) {
      // Map over the files and prepare them for upload
      const imgFile = files.map(({ buffer, originalname, fieldname, mimetype }) => ({
        buffer,
        originalname: 
          mimetype === "application/pdf"
            ? convertFileNameWithPdfExt(originalname)
            : convertFileNameWithWebpExt(originalname),
        fieldname,
        mimetype,
      }));
    
      console.log("imgFile", imgFile);
    
      // Handle the upload of each file
      for (let file of imgFile) {
        try {
          await uploadWorker(file);  // Assuming uploadWorker can handle one file at a time
        } catch (error) {
          console.error('Error uploading file:', error);
          throw new Error('File upload failed');
        }
      }
    
      // After upload, convert imgFile array to object format
      images = convertImgArrayToObject(imgFile);
    } else {
      throw new Error("Invalid or empty files array");
    }

      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const { title, description,
      condition, amount, } = payload;
    if (!title || !description || !condition || !amount) throw new Error("Please provide required information");
    const joinUsData = await this.#repository.updateJoinUs(id, payload);
    if (!joinUsData) throw new NotFoundError("JoinUs data not found");
    // if fild get and update than remove priv file photo 
    if (files.length && joinUsData?.photo) {
      await removeUploadFile(joinUsData?.photo)
    }
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

