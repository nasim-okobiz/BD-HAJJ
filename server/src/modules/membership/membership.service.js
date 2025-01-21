const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
;
const isArrayElementExist = require("../../utils/isArrayElementExist.js");
const membershipRepository = require("./membership.repository.js");
const { isMainThread } = require("worker_threads");
const { generateAccessToken, generateRefreshToken } = require("../../utils/jwt.js");
const joinUsRepository = require("../joinUs/join.us.repository.js");


// import SSLCommerzPayment from 'sslcommerz-lts';
const SslCommerzPayment = require("sslcommerz-lts/api/payment-controller.js");
const { convertFileNameWithWebpExt } = require("../../middleware/upload/convertFileNameWithWebpExt.js");
const { convertFileNameWithPdfExt } = require("../../middleware/upload/convertFileNameWithPdfExt.js");
const { uploadWorker } = require("../../middleware/upload/uploadWorker.js");
const { convertImgArrayToObject } = require("../../middleware/upload/convertImgArrayToObject.js");
const { removeUploadFile } = require("../../middleware/upload/removeUploadFile.js");
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASSWD
const is_live = false //true for live, false for sandbox

class MembershipService extends BaseService {
  #repository;
  #joinUsRepository;
  constructor(repository, joinUsRepository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
    this.#joinUsRepository = joinUsRepository;
  }
  async generateReferCode(length = 8) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let referCode = '';
    for (let i = 0; i < length; i++) {
      referCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return referCode;
  }



  async getAllMembership(payload) {
    const { memberId } = payload
    // if (memberId come than this wise data will be returned
    if (memberId) {
      const membershipData = await this.#repository.findAll({ referCode: memberId });
      if (!membershipData) throw new NotFoundError("Membership data not found");
      return membershipData;
    }
    return await this.#repository.findAll({}, ["userRef"], { userRef: "-password" });
  }

  async getFindMembership(payload) {
    return await this.#repository.getFindMembership(payload);
  }

  async getSingleMembershipByUserId(payload) {
    const { userRef } = payload
    const membershipData = await this.#repository.findOne({ userRef }, ["userRef"], { userRef: "-password" });
    if (!membershipData) throw new NotFoundError('Membership data not found');
    return membershipData;
  }

  async getFindMembershipMemberId(memberId) {
    const merbership = await this.#repository.getFindMembershipMemberId(memberId);
    if (!merbership) throw new NotFoundError('Membership data not found');
    return merbership;
  }

  async getAllMembershipWithPagination(payload) {
    const memberships = await this.#repository.getAllMembershipWithPagination(payload);
    return memberships;
  }

  async updateMembership(id, payloadFiles, payload) {
    const { files } = payloadFiles;
    if (!files) throw new Error("Photo is required");
    const { name, eamil,
      phone, occupation, postOffice,
      division, district, upazila, union,
      personCategory } = payload;

    if (!name || !eamil || !phone || !occupation || !postOffice || !division
      || !district || !upazila || !union || !personCategory) throw new Error("Please fill up all required fields.");
    if (phone?.length !== 11) throw new Error("Phone number should be 11 digits");

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
    const membershipData = await this.#repository.updateMembership(id, payload);
    if (!membershipData) throw new Error("Membership not found");
    if (membershipData.photo) {
      await removeUploadFile(membershipData.photo);
    }
    return membershipData;

  }

  async updateStatusMembership(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const membership = await this.#repository.updateStatus(id, { status: status });

    if (!membership) throw new NotFoundError("Membership not found");
    return membership;
  }

  async getCategoryWiseMembership(id) {
    const membership = await this.#repository.getCategoryWiseMembership(id);
    if (!membership) throw new NotFoundError("Membership not found");
    return membership;
  }

  async deleteMembershipInId(id) {

    const membership = await this.#repository.findById(id);
    if (!membership) throw new NotFoundError("Membership not found");
    const deletedMembership = await this.#repository.deleteById(id);
    if (!deletedMembership) throw new NotFoundError("Membership not found");
    return deletedMembership;
  }

  // payment methods =================================================================
  async createMembership(payloadFiles, payload) {
    const { files } = payloadFiles;
    if (!files) throw new Error("Photo is required");
    const { userRef, name, eamil,
      phone, occupation, postOffice,
      division, district, upazila, union,
      personCategory } = payload;

    if (!name || !eamil || !phone || !occupation || !postOffice || !division
      || !district || !upazila || !union || !personCategory) throw new Error("Please fill up all required fields.");
    if (phone?.length !== 11) throw new Error("Phone number should be 11 digits");
    // check this phone number already exists
    const isPhoneExists = await this.#repository.isUserExists(userRef);
    if (isPhoneExists) throw new Error("This User already Has Membership.");

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
    //  referCode code generated 
    payload.referCode = await this.generateReferCode();

    const membershipData = await this.#repository.createMembership(payload);
    // const auth = await this.#repository.getAuthByEmailOrPhone(email, phone);
    if (!membershipData) throw new NotFoundError('unauthorized access');
    const user_info_encrypted = {
      id: membershipData?._id || null,
      name: membershipData?.name || null,
      email: membershipData?.email || null,
      role: membershipData?.role || null
    };

    const accessToken = generateAccessToken({ userInfo: { user_info_encrypted } });
    const refreshToken = generateRefreshToken({ userInfo: { user_info_encrypted } });

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
      user: user_info_encrypted,
    };
    // return membershipData;
  }
  async paymentMembership(payloadFiles, payload, session) {
    const { files } = payloadFiles;
    if (!files) throw new Error("Photo is required");
    const { userRef, name, eamil,
      phone, occupation, postOffice,
      division, district, upazila, union,
      personCategory } = payload;

    if (!name || !eamil || !phone || !occupation || !postOffice || !division
      || !district || !upazila || !union || !personCategory) throw new Error("Please fill up all required fields.");
    if (phone?.length !== 11) throw new Error("Phone number should be 11 digits");
    // check this phone number already exists
    const isPhoneExists = await this.#repository.isUserExists(userRef);
    if (isPhoneExists) throw new Error("This User already Has Membership.");

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
    //  referCode code generated 
    payload.referCode = await this.generateReferCode();

    const membershipData = await this.#repository.createMembership(payload, session);
    const joinUsData = await this.#joinUsRepository.findOne()

    // return joinUsData;
    if (membershipData.length && joinUsData) {

      const data = {
        total_amount: joinUsData?.amount,
        currency: 'BDT',
        tran_id: membershipData[0]?._id.toString(), // use unique tran_id for each api call
        success_url: `${process.env.SERVER_BASE_URL}/membership/success`,
        fail_url: `${process.env.SERVER_BASE_URL}/membership/fail`,
        cancel_url: `${process.env.SERVER_BASE_URL}/membership/cancel`,
        ipn_url: `${process.env.SERVER_BASE_URL}/ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
      };

      // SSLCommerz payment initialization
      const sslcz = new SslCommerzPayment(store_id, store_passwd, is_live);

      try {
        const apiResponse = await sslcz.init(data);
        const GatewayPageURL = apiResponse.GatewayPageURL;
        return { url: GatewayPageURL };
      } catch (error) {
        console.error('Error initializing payment:', error);
        throw new Error('Payment initialization failed');
      }
    }
  }


  async addAmountSuccess(payload, session) {

    const membershipData = await this.#repository.membershipExists(payload, session)

    const user_info_encrypted = {
      id: membershipData?._id || null,
      name: membershipData?.name || null,
      email: membershipData?.email || null,
      role: membershipData?.role || null
    };

    const accessToken = generateAccessToken({ userInfo: { user_info_encrypted } });
    const refreshToken = generateRefreshToken({ userInfo: { user_info_encrypted } });

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
      user: user_info_encrypted,
    }
  }
  async deleteMembership(payload, session) {
    const { amount, tran_id, } = payload;
    try {
      // Update the transaction based on the provided id
      const status = "Success";
      // const transactionUpdate = await this.#repository.transactionUpdate(id, status, session);
      // if (!transactionUpdate) throw new Error('Transaction failed');

      // const result = await UserSchema.findByIdAndUpdate(
      //   transactionUpdate?.user_ref,
      //   { $inc: { amount: transactionUpdate?.amount } },
      //   { new: true, session }
      // );
      // find by id and update payment 
      const result = await this.#repository.deleteMembership(payload, session)
      return result;
    } catch (error) {
      console.error('Error adding amount:', error);
      throw new Error('Failed to add amount');
    }
  }
}


const membershipService = new MembershipService(membershipRepository, joinUsRepository, "membership");
module.exports = membershipService;