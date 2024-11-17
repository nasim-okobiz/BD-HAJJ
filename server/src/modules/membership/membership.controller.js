const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const MembershipService = require("./membership.service.js");
const config = require("../../config/config.js");


class MembershipController {
  //


  getAllMembership = catchError(async (req, res, next) => {
    const payload = {
      memberId: req.query.memberId,
    }
    const membershipResult = await MembershipService.getAllMembership(payload);
    const resDoc = responseHandler(200, "Get All Memberships", membershipResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  getFindMembership = catchError(async (req, res, next) => {
    const payload = {
      memberId: req.query.memberId,
      phone: req.query.phone,
      agentType: req.query.agentType
    }
    const membershipResult = await MembershipService.getFindMembership(payload);
    const resDoc = responseHandler(200, "Get Find Memberships", membershipResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getFindMembershipMemberId = catchError(async (req, res, next) => {
     const memberId = req.params.memberId;
    const membershipResult = await MembershipService.getFindMembershipMemberId(memberId);
    const resDoc = responseHandler(200, "Get Find Memberships by MemberId", membershipResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getSingleMembershipByUserId = catchError(async (req, res, next) => {
    const payload = {
      userRef: req.params.id,
    }
    const membershipResult = await MembershipService.getSingleMembershipByUserId(payload);
    const resDoc = responseHandler(200, "Get Single Membership By User", membershipResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  getAllMembershipWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
      memberId: req.query.memberId,
      phone: req.query.phone,
    }
    const membershipResult = await MembershipService.getAllMembershipWithPagination(payload);
    const resDoc = responseHandler(200, 'Memberships get successfully', membershipResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateMembership = catchError(async (req, res, next) => {
    const id = req.params.id;
    console.log("id", id);
    const payloadFiles = {
      files: req?.files,
    };
    const userId = req.user.user_info_encrypted.id;
    const payload = {
      userRef: userId,
      name: req.body.name,
      eamil: req.body.eamil,
      phone: req.body.phone,
      occupation: req.body.occupation,
      postOffice: req.body.postOffice,
      division: req.body.division,
      district: req.body.district,
      upazila: req.body.upazila,
      union: req.body.union,
      personCategory: req.body.personCategory,
    }
    const membershipResult = await MembershipService.updateMembership(id, payloadFiles, payload);
    const resDoc = responseHandler(201, "Membership Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateStatusMembership = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const membershipResult = await MembershipService.updateStatusMembership(id, status);
    const resDoc = responseHandler(201, "Membership Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  getCategoryWiseMembership = catchError(async (req, res, next) => {
    const id = req?.params?.id;
    const membershipResult = await MembershipService.getCategoryWiseMembership(id);
    const resDoc = responseHandler(200, "Get Category Wise Memberships", membershipResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteMembership = catchError(async (req, res, next) => {
    const id = req.params.id;
    const membershipResult = await MembershipService.deleteMembershipInId(id);
    const resDoc = responseHandler(200, "Membership Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  //  payment methods =================================================================
  createMembership = withTransaction(async (req, res, next, session) => {
    console.log(req.body);
    const payloadFiles = {
      files: req.files,
    };
    const userId = req.user.user_info_encrypted.id;
    const payload = {
      userRef: userId,
      name: req.body.name,
      eamil: req.body.eamil,
      phone: req.body.phone,
      occupation: req.body.occupation,
      postOffice: req.body.postOffice,
      division: req.body.division,
      district: req.body.district,
      upazila: req.body.upazila,
      union: req.body.union,
      personCategory: req.body.personCategory,
    }
    const membershipResult = await MembershipService.createMembership(
      payloadFiles,
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "Membership Created successfully",
      membershipResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
  paymentMembership = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const userId = req.user.user_info_encrypted.id;
    const payload = {
      userRef: userId,
      name: req.body.name,
      eamil: req.body.eamil,
      phone: req.body.phone,
      occupation: req.body.occupation,
      postOffice: req.body.postOffice,
      division: req.body.division,
      district: req.body.district,
      upazila: req.body.upazila,
      union: req.body.union,
      personCategory: req.body.personCategory,
    }
    const membershipResult = await MembershipService.paymentMembership(
      payloadFiles,
      payload,
      session
    );
    const resDoc = responseHandler(201, 'Amount Created successfully', membershipResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  addAmountSuccess = withTransaction(async (req, res, next, session) => {
    const { amount, tran_id, currency, status } = req.body;
    const payload = { amount, tran_id, currency, status };
    const token = await MembershipService.addAmountSuccess(payload, session);
    console.log("token added successfully", token);
    
    const encodedToken = encodeURIComponent(JSON.stringify(token));
    res.redirect(`${config.clientBaseURL}/membership/success?data=${encodedToken}`);
  })
  addAmountFail = withTransaction(async (req, res, next, session) => {
    console.log('req.body --', req.body);
    const { amount, tran_id, currency, status } = req.body;
    const payload = { amount, tran_id, currency, status };
    const amountResult = await MembershipService.deleteMembership(payload, session);
    res.redirect(`${config.clientBaseURL}/membership/fail`)

  })
  addAmountCancel = withTransaction(async (req, res, next, session) => {
    console.log('req.body --', req.body);
    const { amount, tran_id, currency, status } = req.body;
    const payload = { amount, tran_id, currency, status };
    const amountResult = await MembershipService.deleteMembership(payload, session);

    res.redirect(`${config.clientBaseURL}/membership/fail`)

  })
}

module.exports = new MembershipController();

