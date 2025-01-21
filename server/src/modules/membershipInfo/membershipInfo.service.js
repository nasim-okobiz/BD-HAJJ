const { convertFileNameWithPdfExt } = require("../../middleware/upload/convertFileNameWithPdfExt.js");
const { convertFileNameWithWebpExt } = require("../../middleware/upload/convertFileNameWithWebpExt.js");
const { convertImgArrayToObject } = require("../../middleware/upload/convertImgArrayToObject.js");
const { removeUploadFile } = require("../../middleware/upload/removeUploadFile.js");
const { uploadWorker } = require("../../middleware/upload/uploadWorker.js");
const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const membershipInfoRepository = require("./membershipInfo.repository.js");
const { isMainThread } = require("worker_threads");

class MembershipInfoService extends BaseService {
  #repository;

  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;

  }
  //
  async createMembershipInfo(payloadFiles, payload, session) {
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
    const { header, title,
      description, detail, } = payload;
    if (!header, !title, !description, !detail) throw new Error("Please provide membershipInfo");
    const membershipInfoData = await this.#repository.createMembershipInfo(payload, session);
    return membershipInfoData;
  }
  async getMembershipInfo() {
    return await this.#repository.findAll();
  }
  async updateMembershipInfo(id, payloadFiles, payload) {
    const { files } = payloadFiles;
    let images;
    if (files && files?.length) {
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
    const { header, title,
      description, detail, } = payload;
    if (!header, !title, !description, !detail) throw new Error("Please provide membershipInfo");
    const membershipInfoData = await this.#repository.updateMembershipInfo(id, payload);
    if (!membershipInfoData) throw new NotFoundError("MembershipInfo not found");
    if (membershipInfoData && (files && files?.length)) {
      await removeUploadFile(membershipInfoData?.photo)
    }
    return membershipInfoData;

  }
  async deleteMembershipInfo(id) {
    const MembershipInfo = await this.#repository.findById(id);
    if (!MembershipInfo) throw new NotFoundError("MembershipInfo not found");
    const deletedMembershipInfo = await this.#repository.deleteById(id);
    if (!deletedMembershipInfo) throw new NotFoundError("MembershipInfo not found");
    if (deletedMembershipInfo) {
      await removeUploadFile(MembershipInfo?.photo)
    }
    return deletedMembershipInfo;
  }

}

module.exports = new MembershipInfoService(membershipInfoRepository, "membershipInfo");
