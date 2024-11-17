const config = require('../../config/config.js');

exports.convertImgArrayToObject = (files) => {
  return files.reduce((total, file) => {
    return {
      [`${file.fieldname}`]: `${config.uploadPath}${file.originalname}`,
      ...total,
    };
  }, {});
};
