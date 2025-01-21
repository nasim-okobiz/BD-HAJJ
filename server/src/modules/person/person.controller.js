const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const PersonService = require("./person.service.js");


class PersonController {
  //
  // createPerson = withTransaction(async (req, res, next, session) => {

  //   const payloadFiles = {
  //     files: req.files,
  //   };
  //   const payload = {
  //     name: req.body.name,
  //     eamil: req.body.eamil,
  //     phone: req.body.textEditor,
  //     postOffice: req.body.postOffice,
  //     division: req.body.division,
  //     district: req.body.district,
  //     upazila: req.body.upazila,
  //     union: req.body.union,
  //   }
  //   const personResult = await PersonService.createPerson(
  //     payloadFiles,
  //     payload,
  //     session
  //   );
  //   const resDoc = responseHandler(
  //     201,
  //     "Person Created successfully",
  //     personResult
  //   );
  //   res.status(resDoc.statusCode).json(resDoc);
  // });

  getAllPerson = catchError(async (req, res, next) => {
    const personResult = await PersonService.getAllPerson();
    const resDoc = responseHandler(200, "Get All Persons", personResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  getAllPersonWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    }
    const personResult = await PersonService.getAllPersonWithPagination(payload);
    const resDoc = responseHandler(200, 'Persons get successfully', personResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  getSinglePerson = catchError(async (req, res, next) => {
    const id = req.params.id;
    const personResult = await PersonService.getSinglePerson(id);
    const resDoc = responseHandler(200, "Get Single Person", personResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updatePerson = catchError(async (req, res, next) => {
    const id = req.params.id;

    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      name: req.body.name,
      eamil: req.body.eamil,
      phone: req.body.phone,
      postOffice: req.body.postOffice,
      division: req.body.division,
      district: req.body.district,
      upazila: req.body.upazila,
      union: req.body.union,
      presentAddress: req.body.presentAddress,
      permanentAddress: req.body.permanentAddress,
      postCode: req.body.postCode,
    }
    const personResult = await PersonService.updatePerson(id, payloadFiles, payload);
    const resDoc = responseHandler(201, "Person Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateStatusPerson = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const personResult = await PersonService.updateStatusPerson(id, status);
    const resDoc = responseHandler(201, "Person Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  getCategoryWisePerson = catchError(async (req, res, next) => {
    const id = req?.params?.id;
    const personResult = await PersonService.getCategoryWisePerson(id);
    const resDoc = responseHandler(200, "Get Category Wise Persons", personResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  deletePerson = catchError(async (req, res, next) => {
    const id = req.params.id;
    const personResult = await PersonService.deletePerson(id);
    const resDoc = responseHandler(200, "Person Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new PersonController();

