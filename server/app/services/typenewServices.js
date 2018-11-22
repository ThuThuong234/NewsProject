var AWSConnect = require("../connectAWS/ConnectAWS");
var fs = require("fs");
const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const auth_utils = require('../../lib/auth_utils');
const ldap_utils = require('../../lib/ldap_utils');
const errors = require('../../lib/errors');
const helper = require('../helpers/api_helper');
var docClient = AWSConnect.docClient;

var fs = require("fs");
// var allLoai = JSON.parse(fs.readFileSync("../data/typenew.json", "utf-8"));
// var loadAllData = allLoai.forEach(function (loai) {
//
//     var feedback_params = {
//         TableName: "TypeNew",
//         Item: {
//             "type_id": loai.type_id,
//             "typename": loai.typename
//         }
//     };
//
//     docClient.put(feedback_params, function (err, data) {
//         if (err)
//             console.log("Unable to add news ", loai.typename, ". Error Json:", JSON.stringify(err, null, 2));
//         else
//             console.log("PutItem Successed: ", loai.typename);
//     });
// });

exports.getalltype = function () {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'TypeNew',

        };
        return docClient.scan(params).promise().then(result => {
            if (result.Items.length== 0 ) {
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
exports.insertType = function (data) {
    return new Promise(function (resolve, reject) {
        helper.findTypebyId(data.type_id).then(type => {
            if (type.Items.length != 0) {
                var notice = {
                    message: errors.NEWS_01,
                    code: 'NEWS_01'
                }
                return reject(notice);
            }
            else {
                var params = {
                    TableName: "TypeNew",
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
exports.getDetailType = function (type_id) {
    return new Promise(function (resolve, reject) {
        helper.findTypebyId(type_id).then(result => {
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

