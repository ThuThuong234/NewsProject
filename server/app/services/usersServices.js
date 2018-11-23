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
                    id: user.id,
                    username: user.username
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
        helper.findUsersbyName(data.username).then(user => {
            if (user.Items.length != 0) {
                var notice = {
                    message: errors.TEMPLATE_01,
                    code: 'TEMPLATE_01'
                }
                return reject(notice);
            }
            else {
                var params = {
                    TableName: "Users",
                    Item: data
                };
                return docClient.put(params, function (err, data) {
                    console.log("Dang put code" + data);
                    if (err) {
                        resolve({
                            statusCode: 400,
                            err: 'Could not create massege:${err.stack} '
                        });
                    }
                    else {
                        resolve({statusCode: 200, body: JSON.stringify(params.Item)});
                    }
                })
            }
        }).catch(error => {
            logger.error(error);
            return reject(error);
        });
    });
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
                    console.log("Dang update item" + data);
                    if (err) {
                        resolve({
                            statusCode: 400,
                            err: 'Could not update massege:${err.stack} '
                        });
                    }
                    else {
                        resolve({statusCode: 200, body: JSON.stringify(params.Item)});
                    }
                })
            }).catch(error => {
            logger.error(error);
            return reject(error);
        });
    })
}
exports.deleteUser = function (username) {
    return new Promise(function (resolve, reject) {
        helper.findUsersbyName(username).then(search_username => {
            console.log(search_username.Items);
            if(search_username.Items.length==0){
                throw {
                    message: errors.TEMPLATE_01,
                    code: 'TEMPLATE_01'
                };
            }
            else {
                console.log(search_username.Items[0].username);
                console.log(search_username.Items[0].password);
                var params = {
                    TableName: 'Users',
                    Key: {
                        "news_id": search_username.Items[0].username,
                        "username": search_username.Items[0].password
                    },
                };
                return docClient.delete(params, function (err, data) {
                    console.log("Dang xoa" + data);
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                })
            }
        }).catch(error => {
            logger.error(error);
            return reject(error);
        });
    })
};

