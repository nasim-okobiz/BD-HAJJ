const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");

const isArrayElementExist = require("../../utils/isArrayElementExist.js");
const aboutUsRepository = require("./about.us.repository.js");
const { isMainThread } = require("worker_threads");
const { log } = require("console");
const {
  convertFileNameWithPdfExt,
} = require("../../middleware/upload/convertFileNameWithPdfExt.js");
const {
  convertFileNameWithWebpExt,
} = require("../../middleware/upload/convertFileNameWithWebpExt.js");
const { uploadWorker } = require("../../middleware/upload/uploadWorker.js");
const {
  convertImgArrayToObject,
} = require("../../middleware/upload/convertImgArrayToObject.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");

class AboutUsService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createAboutUs(payloadFiles, payload, session) {
    const { files } = payloadFiles;
    const {
      header,
      title,
      description,
      agencyName,
      honorName,
      whatsApp,
      email,
    } = payload;
    if (
      !header ||
      !title ||
      !description ||
      !agencyName ||
      !honorName ||
      !whatsApp ||
      !email
    ) {
      throw new Error("All fields are required");
    }
    console.log("file", files);

    const requiredFiles = {
      photo: false,
      bgPhoto: false,
    };

    if (files) {
      files.forEach((file) => {
        if (requiredFiles.hasOwnProperty(file.fieldname)) {
          requiredFiles[file.fieldname] = true;
        }
      });
    }

    if (Object.values(requiredFiles).some((required) => !required)) {
      throw new Error(
        "All required photos or documents must be provided: photo, background Photo."
      );
    }
    let images;
    if (Array.isArray(files) && files.length > 0 && isMainThread) {
      // Map over the files and prepare them for upload
      const imgFile = files.map(
        ({ buffer, originalname, fieldname, mimetype }) => ({
          buffer,
          originalname:
            mimetype === "application/pdf"
              ? convertFileNameWithPdfExt(originalname)
              : convertFileNameWithWebpExt(originalname),
          fieldname,
          mimetype,
        })
      );

      console.log("imgFile", imgFile);

      // Handle the upload of each file
      for (let file of imgFile) {
        try {
          await uploadWorker(file); // Assuming uploadWorker can handle one file at a time
        } catch (error) {
          console.error("Error uploading file:", error);
          throw new Error("File upload failed");
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

    const aboutUsData = await this.#repository.createAboutUs(payload, session);
    return aboutUsData;
  }

  async getAllAboutUs() {
    return await this.#repository.findAll();
  }

  async updateAboutUs(id, payloadFiles, payload) {
    const { files } = payloadFiles;
    const {
      header,
      title,
      description,
      agencyName,
      honorName,
      whatsApp,
      email,
    } = payload;

    // Check if all required payload fields are provided
    if (
      !header ||
      !title ||
      !description ||
      !agencyName ||
      !honorName ||
      !whatsApp ||
      !email
    ) {
      throw new Error("All fields are required");
    }

    // Track required files and check if they exist in the uploaded files
    const requiredFiles = { photo: false, bgPhoto: false };
    if (files) {
      files.forEach((file) => {
        if (requiredFiles.hasOwnProperty(file.fieldname)) {
          requiredFiles[file.fieldname] = true;
        }
      });
    }

    // Process image files if present
    let images;
    if (files.length > 0) {
      if (Array.isArray(files) && files.length > 0 && isMainThread) {
        // Map over the files and prepare them for upload
        const imgFile = files.map(
          ({ buffer, originalname, fieldname, mimetype }) => ({
            buffer,
            originalname:
              mimetype === "application/pdf"
                ? convertFileNameWithPdfExt(originalname)
                : convertFileNameWithWebpExt(originalname),
            fieldname,
            mimetype,
          })
        );

        console.log("imgFile", imgFile);

        // Handle the upload of each file
        for (let file of imgFile) {
          try {
            await uploadWorker(file); // Assuming uploadWorker can handle one file at a time
          } catch (error) {
            console.error("Error uploading file:", error);
            throw new Error("File upload failed");
          }
        }

        // After upload, convert imgFile array to object format
        images = convertImgArrayToObject(imgFile);
      } else {
        throw new Error("Invalid or empty files array");
      }

      // Update payload with new image paths
      if (images) {
        Object.assign(payload, images);
      }
    }
    // Update the database with the new data
    const aboutUsData = await this.#repository.updateAboutUs(id, payload);

    // Remove old files if they’re being replaced
    if (aboutUsData) {
      const filesToRemove = [
        requiredFiles.photo ? aboutUsData.photo : null,
        requiredFiles.bgPhoto ? aboutUsData.bgPhoto : null,
      ].filter(Boolean);

      for (const filePath of filesToRemove) {
        await removeUploadFile(filePath);
      }
    }

    return aboutUsData;
  }

  async deleteAboutUs(id) {
    const aboutUs = await this.#repository.findById(id);
    if (!aboutUs) throw new NotFoundError("AboutUs not found");
    const deletedAboutUs = await this.#repository.deleteById(id);
    console.log("aboutUs", aboutUs);
    if (deletedAboutUs) {
      await removeUploadFile(aboutUs?.photo);
    }
    return deletedAboutUs;
  }
}

module.exports = new AboutUsService(aboutUsRepository, "aboutUs");
