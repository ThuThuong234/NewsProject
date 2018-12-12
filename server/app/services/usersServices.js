var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
const jwt = require('jsonwebtoken');
var fs = require("fs");

const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const auth_utils = require('../../lib/auth_utils');
const ldap_utils = require('../../lib/ldap_utils');
const errors = require('../../lib/errors')
const helper = require('../helpers/api_helper');

console.log("Importing data into DynamoDB. Please wait.");
// // var allUser = JSON.parse(fs.readFileSync("../data/users.json", "utf-8"));
// // var loadAllData = allUser.forEach(function (user) {
// //
// //     var user_params = {
// //         TableName: "Users",
// //         Item: {
// //
// //          } "username": user.username,
// // //             "password": user.password,
// // //                 "last_login" : user.last_login,
// // //                 "img" : user.img,
// //     };
// //
// //     docClient.put(user_params, function (err, data) {
// //         if (err)
// //             console.log("Unable to add news ", user.username, ". Error Json:", JSON.stringify(err, null, 2));
// //         else
// //             console.log("PutItem Successed: ", user.username);
// //     });
// // });
function findUser(username, password) {
    return new Promise(function (resolve, reject) {
        var find_user_param = {
            TableName: "Users",
            ProjectionExpression: "#username",
            KeyConditionExpression: "#username = :username and #password = :password",
            ExpressionAttributeNames: {
                "#username": "username",
                "#password": "password"
            },
            ExpressionAttributeValues: {
                ":username": username,
                ":password": password
            }
        };

        docClient.query(find_user_param, function (err, user) {
            console.log("getuser from id: " + user.Items);
            if (err)
                return reject(err);
            else resolve(user);
        });
    });
}
exports.authenticate = function (username, password) {

    return new Promise(function (resolve, reject) {
        findUser(username, password).then(user => {
            if (user.Items.length == 0) {
                throw {
                    message: errors.AUTHENTICATE_01,
                    code: 'AUTHENTICATE_01'
                };
            }

            let ldap_login = ldap_utils.LDAPAuthenticate(username, password);
            return Promise.all([user, ldap_login]);
        })
            .then(([user, ldap_login]) => {
                if (!ldap_login) {
                    throw {
                        message: errors.AUTHENTICATE_01,
                        code: 'AUTHENTICATE_01'
                    };
                }

                let resultData = {
                    username: username
                };
                let token = auth_utils.getToken(resultData);
                resultData.token = token;

                user.last_login = new Date();
                return resolve(resultData);
            })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
}
exports.getAllUser = function () {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'Users',

        };
        return docClient.scan(params).promise().then(result => {
            if (result == null) {
                throw {
                    message: errors.TEMPLATE_01,
                    code: 'TEMPLATE_01'
                };
            }
            return resolve(result);
        })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};
exports.insertUsers = function (data) {
    return new Promise(function (resolve, reject) {
        if(!helper.CheckEmail(data.username)){
            var notice = {
                message: errors.USER_03,
                code: 'USER_03'
            }
            return reject(notice);
        }
        else{
            helper.findUsersbyName(data.username).then(user => {
                console.log(data.username);
                if (user.Items.length != 0) {
                    var notice = {
                        message: errors.TEMPLATE_01,
                        code: 'TEMPLATE_01'
                    }
                    return reject(notice);
                }else {
                    var params = {
                        TableName: "Users",
                        Item:{
                            "username": data.username,
                            "password" :data.password
                        },

                    };
                    return docClient.put(params, function (err, data) {
                        console.log("Dang nhap user" + data);
                        if (err) {
                            reject(err);
                        }
                        else {
                            if (data == null) {
                                throw {
                                    message: errors.CREATE,
                                    code: 'CREATE'
                                };
                            }
                            else
                                resolve(data);
                        }
                    });
                }

            }).catch(error => {
                logger.error(error);
                return reject(error);
            });
        }
    })
}
exports.getUser = function (username) {
    return new Promise(function (resolve, reject) {
        console.log(username);
        helper.findUsersbyName(username)
            .then(result => {
            if (result.Items.length == 0) {
                throw {
                    message: errors.TEMPLATE_01,
                    code: 'TEMPLATE_01'
                };
            }
            console.log(result);
            return resolve(result);
        })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};
exports.updateUser = function (data) {
    return new Promise(function (resolve, reject) {
        helper.findUsersbyName(data.username)
            .then(function () {
                console.log(data.username);
                var params = {
                    TableName: "Users",
                    Key: {
                        "username": data.username,
                        "password" : data.password
                    },
                    UpdateExpression: "set last_login = :l , img = :i",
                    ExpressionAttributeValues: {
                        ":l" : data.last_login,
                        ":i" : data.img,

                    },
                    ReturnValue: "UPDATE_User"
                };
                return docClient.update(params, function (err, data) {
                    console.log("Dang cap nhat" + data);
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                })
            }).catch(error => {
            logger.error(error);
            return reject(error);
        });
    })
}


