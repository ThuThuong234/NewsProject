'use strict';

const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const constants = require('../lib/constants');
const errors = require('../lib/errors');

function getToken(user) {
    return jwt.sign(user, constants.SECRET, { expiresIn: constants.AUTHENTICATE_EXPIRE });
}

// function authorizeRoles(roles, req) {
//     return new Promise(function (resolve, reject) {
//         let token = req.headers['x-access-token'];
//         if (!token) {
//             reject({
//                 message: errors.AUTHORIZE_01,
//                 code: 'AUTHORIZE_01'
//             });
//         }
//
//         let verifySync = Promise.promisify(jwt.verify);
//         verifySync(token, constants.SECRET).then(userData => {
//             // if user is not authorized --> no access permitted
//             if (!userData || !userData.role || !roles.includes(userData.role.code)) {
//                 throw {
//                     message: errors.AUTHORIZE_01,
//                     code: 'AUTHORIZE_01'
//                 };
//             }
//
//             // if everything is good, save to request for use in other routes
//             req.current_user = userData;
//             resolve();
//         })
//             .catch(error => {
//                 logger.error(error);
//                 return reject(error);
//             });
//     });
// }

exports.getToken = getToken;

// exports.authorizeRoles = function (roles) {
//     return function (req, res, next) {
//         authorizeRoles(roles, req).then(() => {
//             next();
//         })
//             .catch(error => {
//                 res.json(utils.failedResponse(error));
//             });
//     };
// };
//
// exports.authorizeAdmin = function (req, res, next) {
//     authorizeRoles([enums.ROLE.ADMIN], req).then(() => {
//         next();
//     })
//         .catch(error => {
//             res.json(utils.failedResponse(error));
//         });
// };
//
// exports.authorizeHR = function (req, res, next) {
//     authorizeRoles([enums.ROLE.HR], req).then(() => {
//         next();
//     })
//         .catch(error => {
//             res.json(utils.failedResponse(error));
//         });
// };
//
// exports.authorizeAdminHR = function (req, res, next) {
//     authorizeRoles([enums.ROLE.ADMIN, enums.ROLE.HR], req).then(() => {
//         next();
//     })
//         .catch(error => {
//             res.json(utils.failedResponse(error));
//         });
// };

// exports.authorizeAny = function (req, res, next) {
//     authorizeRoles([enums.ROLE.ADMIN, enums.ROLE.HR, enums.ROLE.EMPLOYEE], req).then(() => {
//         next();
//     })
//         .catch(error => {
//             res.json(utils.failedResponse(error));
//         });
// };

// exports.authorizeHeader = function (req, res, next) {
//     let apiKey = req.headers['x-api-key'];
//     if (apiKey != constants.API_KEY) {
//         res.json(utils.failedResponse({
//             message: errors.AUTHORIZE_01,
//             code: 'AUTHORIZE_01'
//         }));
//     } else {
//         next();
//     }
// };