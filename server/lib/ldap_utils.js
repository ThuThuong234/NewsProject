'use strict';

// const ldap = require('ldapjs');
const Promise = require('bluebird');
// const log4js = require('log4js');
// const logger = log4js.getLogger('ldap_utils');

// const config = require('../config/config');
// const utils = require('../lib/utils');
// const models = require('../models');
// const errors = require('../lib/errors');

exports.LDAPAuthenticate = function () {
  return new Promise(function (resolve) {
    return resolve(true);
  });
};

// exports.LDAPAuthenticate = function (username, password) {
//   return new Promise(function (resolve, reject) {
//     let client = ldap.createClient({
//       url: config.LDAP_url
//     });

//     client.on('error', function (error) {
//       logger.error(error);
//       return reject(error);
//     });

//     let formatedUsername = "uid=" + username + ",ou=Users,dc=imttool,dc=com";

//     client.bind(formatedUsername, password, function (error) {
//       if (err === null) {
//         return resolve(true);
//       }
//       else {
//         client.unbind();
//         logger.error(error);
//         return reject(error);
//       }
//     });
//   });
// };

// exports.GetUsersFromLDAP = function (callback) {
//   let client = ldap.createClient({
//     url: 'ldap://192.168.100.65'
//   });

//   let opts = {
//     filter: '(mail=*@imt-soft.com)',
//     scope: 'sub'
//     //attributes: ['dn', 'sn', 'cn']
//   };

//   let users = [];

//   client.search('ou=Users,dc=imttool,dc=com', opts, function (err, res) {
//     if (err !== null) {
//       return callback(err, null);
//     }

//     res.on('searchEntry', function (entry) {
//       users.push(entry.object);
//       console.log('entry: ' + JSON.stringify(entry.object));
//     });

//     res.on('searchReference', function (referral) {
//       console.log('referral: ' + referral.uris.join());
//     });

//     res.on('error', function (err) {
//       console.error('error: ' + err.message);
//       return callback(null, utils.ResultError(err.message, err.code));
//     });

//     res.on('end', function (result) {
//       console.log('status: ' + result.status);
//       return callback(null, utils.ResultSuccess(users));
//     });
//   });

// }

// exports.syncFromLDAP = function (users, callback) {
//   let new_users = 0;
//   let error_users = 0;
//   let deactivated_users = 0;

//   // get all users from db and filter the deleted from LDAP
//   models.User.findAll()
//     .then(function (dbUsers) {
//       // then we will have the list of users that has been removed from LDAP but still exists in our db
//       for (let i = dbUsers.length - 1; i >= 0; i--) {
//         for (let j = 0; j < users.length; j++) {
//           if (dbUsers[i] && (dbUsers[i].account === users[j].mail)) {
//             dbUsers.splice(i, 1);
//           }
//         }
//       }

//       // then we will have the list of users that has been removed from LDAP but still exists in our db
//       dbUsers.forEach(function (dbUser) {
//         dbUser.updateAttributes({
//           'active': false
//         })
//           .then(function () {
//             deactivated_users += 1;
//           })
//           .catch(function (err) {
//             error_users += 1;
//           });
//       });

//       Promise.forEach(users, function (user, next) {
//         models.User.findOne({
//           where: {
//             account: user.mail
//           }
//         })
//           .then(function (foundedUser) {
//             if (foundedUser) {
//               // current user exists
//               foundedUser.updateAttributes({
//                 'fullname': user.displayName,
//                 'active': true,
//                 'updated_at': new Date()
//               }).catch(function (err) {
//                 error_users += 1;
//               });
//             } else {
//               // user do not exists
//               models.User.create({
//                 'account': user.mail,
//                 'fullname': user.displayName,
//                 'active': true, // TODO: need to check
//                 'last_login': null,
//                 'created_at': new Date(),
//                 'updated_at': new Date()
//               }).then(function (instance) {
//                 new_users += 1;
//               }).catch(function (err) {
//                 error_users += 1;
//               });
//             }
//             next(new_users, error_users);
//           });
//       }, function (err) {
//         let data = {
//           "new_users": new_users,
//           "deactivated_users": deactivated_users,
//           "error_users": error_users
//         };
//         return callback(null, utils.ResultSuccess(data));
//       });

//     })
//     .catch(function (error) {
//       logger.error(error.message);
//       return callback(error.message, null);
//     });
// }