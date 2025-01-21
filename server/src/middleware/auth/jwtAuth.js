
// import { BadRequestError } from '../../utils/errors.js';
// import { verifyAccessToken } from '../../utils/jwt.js';

// const jwtAuth = () => {
//   return async (req, res, next) => {



//     try {
//       const bearer = req.headers.authorization || req.headers.Authorization;

//       if (!bearer || !bearer.startsWith('Bearer ')) {
//         throw new BadRequestError('token not found');
//       }
//       const token = bearer.split('Bearer ')[1].trim();
//       const payload = await verifyAccessToken(token);


//       if (!payload) throw new BadRequestError('unauthorized');
//       req.user = { ...payload.userInfo.user_info_encrypted };
//       next();
//     } catch (err) {
//       next(err);
//     }
//   }
// };
// export default jwtAuth;

const { BadRequestError } = require('../../utils/errors.js');
const { verifyAccessToken } = require('../../utils/jwt.js');

const jwtAuth = (...role) => { // rider, branch, admin, merchant
  return async (req, res, next) => {
    try {
      const bearer = req.headers.authorization || req.headers.Authorization;

      if (!bearer || !bearer.startsWith('Bearer ')) {
        throw new BadRequestError('token not found');
      }
      const token = bearer.split('Bearer ')[1].trim();
      const payload = await verifyAccessToken(token);
      if (!payload) throw new BadRequestError('unauthorized');



      if (!role.includes(payload.userInfo.user_info_encrypted.role)) {
        throw new BadRequestError('unauthorized');
      }
      req.user = { ...payload.userInfo };
      next();
    } catch (err) {
      next(err);
    }
  }
};

module.exports = jwtAuth;
