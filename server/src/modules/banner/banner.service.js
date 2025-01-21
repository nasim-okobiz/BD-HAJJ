const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
// const {
//   convertFileNameWithPdfExt,
//   convertFileNameWithWebpExt,
//   convertImgArrayToObject,
//   convertObjOriginalImgNameWithWebpExt,
//   removeUploadFile,
//   uploadWorker,
// } = require("../../middleware/upload/index.js");
const isArrayElementExist = require("../../utils/isArrayElementExist.js");
const bannerRepository = require("./banner.repository.js");
const { isMainThread } = require("worker_threads");
const { convertFileNameWithPdfExt } = require("../../middleware/upload/convertFileNameWithPdfExt.js");
const { convertFileNameWithWebpExt } = require("../../middleware/upload/convertFileNameWithWebpExt.js");
const { uploadWorker } = require("../../middleware/upload/uploadWorker.js");
const { convertImgArrayToObject } = require("../../middleware/upload/convertImgArrayToObject.js");
const { removeUploadFile } = require("../../middleware/upload/removeUploadFile.js");


class BannerService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createBanner(payloadFiles, payload) {
    const { files } = payloadFiles;
    if (!files) throw new Error("Photo is required");
    if (!payload?.packageRef) throw new Error("package is required");

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
      throw new Error("Photo is required");
    }


    for (const key in images) {
      payload[key] = images[key];
    }


    const bannerData = await this.#repository.createBanner(payload);
    return bannerData;
  }

  async getAllBanner() {
    return await this.#repository.findAll({}, ['packageRef'], { packageRef: "name" });
    // discount
    // discountType
    // discountPrice
    // validDate
    // price
    // minPayPrice
    // mrpPrice
    // roomType
    // photo
    // hotalDistance
    // packageIncludes
    // packageExcludes
    // documentsRequired
    // bookingPolicy
    // termsAndConditions
    // earlyBird" });
  }

  async updateBanner(id, payload, payloadFiles) {
    const { files } = payloadFiles;

    if (!payload?.packageRef) throw new Error("package is required");
    if (!files) throw new Error("Photo is required");

    let images;
    if (files?.length > 0) {
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
        throw new Error("Photo is required");
      }
      for (const key in images) {
        payload[key] = images[key];
      }
    }
    const bannerData = await this.#repository.updateBanner(id, payload);

    if (bannerData) {
      await removeUploadFile(bannerData?.photo)
    }
    return bannerData;

  }

  async updateStatusBanner(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const banner = await this.#repository.updateStatus(id, { status: status });

    if (!banner) throw new NotFoundError("Banner not found");
    return banner;
  }

  async deleteBanner(id) {
    const banner = await this.#repository.findById(id);
    if (!banner) throw new NotFoundError("Banner not found");
    const deletedBanner = await this.#repository.deleteById(id);
    if (deletedBanner) {
      await removeUploadFile(banner?.photo)
    }
    return deletedBanner;
  }
}

module.exports = new BannerService(bannerRepository, "banner");

