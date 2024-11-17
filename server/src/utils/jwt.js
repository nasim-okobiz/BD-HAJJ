const Jwt = require('jsonwebtoken');
const config = require('../config/config.js');

exports.generateAccessToken = (payload) => {
  return Jwt.sign(payload, config.jwtAccessSecretKey, {
    expiresIn: '1d',
  });
};

exports.generateRefreshToken = (payload) => {
  return Jwt.sign(payload, config.jwtRefreshSecretKey, {
    expiresIn: '365d',
  });
};

exports.verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    Jwt.verify(token, config.jwtAccessSecretKey, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};

exports.verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    Jwt.verify(token, config.jwtRefreshSecretKey, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};
