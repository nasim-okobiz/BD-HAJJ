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
const imageGalleryRepository = require("./image.gallery.repository.js");
const { isMainThread } = require("worker_threads");
const { convertFileNameWithPdfExt } = require("../../middleware/upload/convertFileNameWithPdfExt.js");
const { convertFileNameWithWebpExt } = require("../../middleware/upload/convertFileNameWithWebpExt.js");
const { uploadWorker } = require("../../middleware/upload/uploadWorker.js");
const { convertImgArrayToObject } = require("../../middleware/upload/convertImgArrayToObject.js");
const { removeUploadFile } = require("../../middleware/upload/removeUploadFile.js");


class ImageGalleryService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createImageGallery(payloadFiles, payload, session) {
    const { files } = payloadFiles;
    if (!files) throw new Error("Photo is required");
    const { galleryType } = payload;
    if (!galleryType) throw new Error("Gallery type is required");

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

    const imageGalleryData = await this.#repository.createImageGallery(payload);
    return imageGalleryData;
  }

  async getAllImageGallery() {
    return await this.#repository.findAll();
  }

  async getAllImageGalleryWithPagination(payload) {
    const imageGallery = await this.#repository.getAllImageGalleryWithPagination(payload);
    return imageGallery;
  }

  async updateImageGallery(id, payloadFiles, payload) {
    const { files } = payloadFiles;
    const { galleryType } = payload;
    if (!galleryType) throw new Error("Gallery type is required");
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

    //update by id 
    const imageGalleryData = await this.#repository.updateImageGallery(id, payload);
    if (!imageGalleryData) throw new Error("Image Gallery not found");
    if (imageGalleryData && (files && files?.length)) {
      await removeUploadFile(imageGalleryData?.photo)
    }
    return imageGalleryData;

  }

  async updateStatusImageGallery(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const imageGallery = await this.#repository.updateStatus(id, { status: status });

    if (!imageGallery) throw new NotFoundError("ImageGallery not found");
    return imageGallery;
  }
  async getTypeByImageGallery(type) {
    // const galleryType = type;
    return await this.#repository.findAll({ galleryType: type, status: true });
  }

  async deleteImageGallery(id) {
    const imageGallery = await this.#repository.findById(id);
    if (!imageGallery) throw new NotFoundError("ImageGallery not found");
    const deletedImageGallery = await this.#repository.deleteById(id);
    if (deletedImageGallery) {
      await removeUploadFile(imageGallery?.photo)
    }
    return deletedImageGallery;
  }
}

module.exports = new ImageGalleryService(imageGalleryRepository, "imageGallery");
