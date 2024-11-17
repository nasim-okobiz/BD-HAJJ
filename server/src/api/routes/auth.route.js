const { Router } = require('express');
const controller = require('../../modules/auth/auth.controller.js');
const { upload } = require('../../middleware/upload/upload.js');
const jwtAuth = require('../../middleware/auth/jwtAuth.js');




const AuthRouter = Router();
AuthRouter
  .post('/singup', controller.authUserSingUp)
  .post('/singin', controller.authUserSingIn)
  .post('/forget-password', controller.authForgetPassword)
  .post('/forget-password/otp-verification', controller.authForgetPasswordVarification)
  .get('/', jwtAuth('admin', 'user', 'agent'), controller.getUserById)
  .put('/', upload.any(), jwtAuth('admin', 'user', 'agent'), controller.updateUser)
  .get('/user', jwtAuth('admin'), controller.getAllUserWithPagination)
  .get('/user/:id', jwtAuth('admin'), controller.getSingleUser)
  .get('/role/:id', jwtAuth('admin'), controller.getSingleUser)



  module.exports = AuthRouter;
