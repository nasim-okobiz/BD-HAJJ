const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const isArrayElementExist = require("../../utils/isArrayElementExist.js");
const personRepository = require("./person.repository.js");
const { isMainThread } = require("worker_threads");
const { convertFileNameWithPdfExt } = require("../../middleware/upload/convertFileNameWithPdfExt.js");
const { convertFileNameWithWebpExt } = require("../../middleware/upload/convertFileNameWithWebpExt.js");
const { uploadWorker } = require("../../middleware/upload/uploadWorker.js");
const { convertImgArrayToObject } = require("../../middleware/upload/convertImgArrayToObject.js");
const { removeUploadFile } = require("../../middleware/upload/removeUploadFile.js");


class PersonService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createPerson(payloadFiles, payload) {
    const { files } = payloadFiles;
    if (!files) throw new Error("Photo is required");
    const { name, eamil,
      phone, postOffice,
      division, district,
      upazila, union, } = payload;
    if (!name || !phone || !postOffice || !division || !district || !upazila || !union) throw new Error("Please fill up all required fields.");

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
    const personData = await this.#repository.createPerson(payload);
    return personData;
  }

  async getAllPerson() {
    return await this.#repository.findAll({ status: true }, ["personCategoryRef"]);
  }

  async getAllPersonWithPagination(payload) {
    const persons = await this.#repository.getAllPersonWithPagination(payload);
    return persons;
  }
  async getSinglePerson(id) {
    const personData = await this.#repository.findOne({ _id: id }, []);
    if (!personData) throw new NotFoundError("Person not found");
    return personData;
  }

  async updatePerson(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    // nidFront, nidBack, passportFront, passportBack, passportPhoto must be required in file upload
    const requiredFiles = {
      nidFront: false,
      nidBack: false,
      passportFront: false,
      passportBack: false,
      passportPhoto: false,
    };

    if (files) {
      files.forEach(file => {
        if (requiredFiles.hasOwnProperty(file.fieldname)) {
          requiredFiles[file.fieldname] = true;
        }
      });
    }

    // if (Object.values(requiredFiles).some(required => !required)) {
    //   throw new Error("All required photos or documents must be provided: nidFront, nidBack, passportFront, passportBack, passportPhoto.");
    // }

    const { name, eamil,
      phone, postOffice,
      division, district,
      upazila, union, presentAddress, permanentAddress,
      postCode } = payload;


    if (!name || !phone || !postOffice || !division || !district || !upazila || !union || !presentAddress
      || !permanentAddress || !postCode) throw new Error("Please fill up all required fields.");
    if (postCode?.length !== 4) throw new Error("Post code should be 4 digits");

    if (phone?.length !== 11) throw new Error("Phone number should be 11 digits");
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
    const personData = await this.#repository.updatePerson(id, payload);
    if (!personData) throw new Error("Person not found");
    if (personData) {
      const filesToRemove = [
        requiredFiles.nidFront ? personData.nidFront : null,
        requiredFiles.nidBack ? personData.nidBack : null,
        requiredFiles.passportFront ? personData.passportFront : null,
        requiredFiles.passportBack ? personData.passportBack : null,
        requiredFiles.passportPhoto ? personData.passportPhoto : null
      ].filter(Boolean); // Remove any null entries

      // Remove files if they exist
      for (const filePath of filesToRemove) {
        await removeUploadFile(filePath);
      }
    }
    return personData;

  }

  async updateStatusPerson(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const person = await this.#repository.updateStatus(id, { status: status });

    if (!person) throw new NotFoundError("Person not found");
    return person;
  }

  async getCategoryWisePerson(id) {
    const person = await this.#repository.getCategoryWisePerson(id);
    if (!person) throw new NotFoundError("Person not found");
    return person;
  }

  async deletePerson(id) {
    const person = await this.#repository.findById(id);
    if (!person) throw new NotFoundError("Person not found");
    const deletedPerson = await this.#repository.deleteById(id);
    if (deletedPerson) {
      await removeUploadFile(person?.photo)
    }
    return deletedPerson;
  }
}

module.exports = new PersonService(personRepository, "person");

