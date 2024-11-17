const { convertFileNameWithPdfExt } = require("../../middleware/upload/convertFileNameWithPdfExt.js");
const { convertFileNameWithWebpExt } = require("../../middleware/upload/convertFileNameWithWebpExt.js");
const { convertImgArrayToObject } = require("../../middleware/upload/convertImgArrayToObject.js");
const { uploadWorker } = require("../../middleware/upload/uploadWorker.js");

const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");

const isArrayElementExist = require("../../utils/isArrayElementExist.js");
const packageRepository = require("./package.repository.js");
const { isMainThread } = require("worker_threads");
const packageTypeRepository = require("../packageType/package.type.repository.js");
const { query } = require("express");
const { removeUploadFile } = require("../../middleware/upload/removeUploadFile.js");


class PackageService extends BaseService {
  #repository;
  #packageTypeRepository;
  constructor(repository, packageTypeRepository, serviceName) {
    super(repository, packageTypeRepository, serviceName);
    this.#repository = repository;
    this.#packageTypeRepository = packageTypeRepository;
  }

  async createPackage(payloadFiles, payload, session) {
    const { files } = payloadFiles
    if (!files) throw new Error("Photo is required");
    const { packageRef, name, title, discountType, validDate, earlyBird, price, minPayPrice, } = payload;
    if (!packageRef || !name || !title || !price || !minPayPrice) throw new Error("All fields are required");
    // packageRef and earlyBird true than find this package


    if (earlyBird == 'true' ) {
      const packageExists = await this.#repository.earlyBirdPackageExists(packageRef);
      if (packageExists) {
        throw new Error("Early bird Package already exists");
      }
    }else if (earlyBird == 'undefined' ){
      delete payload.earlyBird;
    }

    let discount = payload.discount == 'undefined' ? 0 : payload.discount;
    console.log("first, ", payload)
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
    // calculate discount price 
    const discountPrice =
      discountType === "percent"
        ? (price * discount) / 100
        : (price - discount);
    // mrpPrice 
    const mrpPrice =
      discountType === "percent"
        ? price - discountPrice
        : discountPrice;

    payload.discountPrice = discount > 0 ?  Math.round(discountPrice) : 0;
    payload.mrpPrice =  Math.round(mrpPrice);
    if (payload.discountType == 'undefined') {
      delete payload.discountType;
    }
    if (payload.validDate == 'undefined') {
      delete payload.validDate;
    }
    if (payload.discount == 'undefined') {
      delete payload.discount;
    }
    console.log("------", payload)

    const packageData = await this.#repository.createPackage(payload);
    return packageData;
  }

  async getAllPackage(payload) {
    return await this.#repository.getAllPackage(payload);
  }

  async getSinglePackage(id) {
    const packageData = await this.#repository.findById(id, ["packageRef"]);
    if (!packageData) throw new NotFoundError("Package Not Found");
    return packageData;
  }

  async getAllPackageWithPagination(payload) {
    const packages = await this.#repository.getAllPackageWithPagination(payload);
    return packages;
  }

  async getAllPackageWithGroup() {
    const packageTypes = await this.#packageTypeRepository.findAll({}, [])
    return await this.#repository.getAllPackageWithGroup(packageTypes);
  }

  async updatePackage(id, payloadFiles, payload) {
    const { files } = payloadFiles
    if (!files) throw new Error("Photo is required");
    console.log("payload, payload", payload)
    const { packageRef, name, title, validDate, discountType, earlyBird, price, minPayPrice, roomType, hotalDistance,
      packageIncludes, packageExcludes, documentsRequired, bookingPolicy, termsAndConditions } = payload;
    if (!packageRef || !name || !title || !price || !minPayPrice) throw new Error("All fields are required");

    if (earlyBird == 'true' ) {
      const packageExists = await this.#repository.earlyBirdPackageExistsWithOutThisId(id,packageRef);
      if (packageExists) {
        throw new Error("Early bird Package already exists");
      }
    }else if (earlyBird == 'undefined' ){
      delete payload.earlyBird;
    }
    let discount = payload.discount == 'undefined' ?  0 : payload.discount;
    let images;
    if (files.length) {
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
    // calculate discount price 
    const discountPrice =
      discountType === "percent"
        ? (price * discount) / 100
        : (price - discount);
    // mrpPrice 
    const mrpPrice =
      discountType === "percent"
        ? price - discountPrice
        : discountPrice;

    payload.discountPrice =  discount > 0 ?  Math.round(discountPrice) : 0;
    payload.mrpPrice =  Math.round(mrpPrice)
    if (payload.discountType == 'undefined') {
      delete payload.discountType;
    }
    if (payload.validDate == 'undefined' || payload.validDate == "null") {
      delete payload.validDate;
    }
    if (payload.discount == 'undefined') {
      delete payload.discount;
    }
    console.log("payload, payload", payload)
    console.log("payload, payload", discount, discountType )
    const packageData = await this.#repository.updatePackage(id, payload);
    if (!packageData) throw new NotFoundError("Package  Not Found");
    console.log("packageData", packageData);
    if (packageData && files.length) {
      await removeUploadFile(packageData?.photo)
    }
    return packageData;

  }

  async updateStatusPackage(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const packageResult = await this.#repository.updateStatus(id, { status: status });
    console.log("package", packageResult);
    if (!packageResult) throw new NotFoundError("Package not found");
    return packageResult;
  }

  async deletePackage(id) {
    const packageResult = await this.#repository.findById(id);
    if (!packageResult) throw new NotFoundError("Package not found");
    const deletedPackage = await this.#repository.deleteById(id);
    if (deletedPackage) {
      await removeUploadFile(packageResult?.photo)
    }
    return deletedPackage;
  }
}

module.exports = new PackageService(packageRepository, packageTypeRepository, "package");
