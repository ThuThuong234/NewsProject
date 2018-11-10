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
// var allUser = JSON.parse(fs.readFileSync("../data/users.json", "utf-8"));
// var loadAllData = allUser.forEach(function (user) {
//
//     var user_params = {
//         TableName: "Users",
//         Item: {
//             "user_id": user.id,
//             "username": user.username,
//             "password": user.password,
//                 "last_login" : user.last_login,
//                 "img" : user.img,
// //         }
//     };
//
//     docClient.put(user_params, function (err, data) {
//         if (err)
//             console.log("Unable to add news ", user.username, ". Error Json:", JSON.stringify(err, null, 2));
//         else
//             console.log("PutItem Successed: ", user.username);
//     });
// });
function findUser(username, password){
    return new Promise(function (resolve, reject) {
        var find_user_param = {
            TableName: "Users",
            ProjectionExpression: "#username",
            KeyConditionExpression: "#username = :username and #password = :password",
            ExpressionAttributeNames: {
                "#username": "username",
                "#password" : "password"
            },
            ExpressionAttributeValues: {
                ":username": username,
                ":password" : password
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
exports.authenticate = function(username, password) {

   return new Promise(function (resolve, reject){
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
   } );
}

exports.getAll = async function() {

}

exports.insertNews = function (data) {
    return new Promise(function (resolve,reject) {
        helper.findNewsbyID(data.news_id).then(function () {
            var params = {
                TableName: "Users",
                Item: data
            }
        });
        return docClient.put(params, function (err, data) {
            console.log("Dang put code" + data);
            if (err) {
                resolve({
                    statusCode: 400,
                    err: 'Could not create massege:${err.stack} '
                });
            }
            else {
                resolve({statusCode: 200, body: JSON.stringify(param.Item)});
            }
        })
    }).catch(error => {
        logger.error(error);
        return reject(error);
    });
}
exports.getNews = function () {
    return new Promise(function (resolve,reject) {

        var params = {
            TableName:'Users',
            KeyConditionExpression: "#id:= yyyy",
            ExpressionAttributeNames:{  "#id": "id"
    },
        ExpressionAttributeValues: {
            ":yyyy": parseInt(req.params.id)
        }
        };
        return docClient.query(params).promise().then(result =>{
            if (result ==null)
            {
                throw {
                    message: errors.GETNEWS_02,
                    code:'GETNEWS_02'
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
exports.updateNews = function (data) {
    return new Promise(function (resolve,reject) {
        helper.findNewsbyID(data.news_id).then(function () {
            var params = {
                TableName: "Users",
                Key: {
                    "id": body.id,
                    "title": body.title,
                    "content": body.content,
                    "image": body.image,
                    "postdate": body.postdate
                }
            };
            console.log("Updating the item...");
            return docClient.update(params, function (err, data) {
                console.log("Dang update item" + data);
                if (err) {
                    resolve({
                        statusCode: 400,
                        err: 'Could not update massege:${err.stack} '
                    });
                }
                else {
                    resolve({statusCode: 200, body: JSON.stringify(param.Item)});
                }
            })
        }).catch(error => {
            logger.error(error);
            return reject(error);
        });
    })
}


