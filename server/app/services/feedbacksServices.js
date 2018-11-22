var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const errors = require('../../lib/errors');
const helper = require('../helpers/api_helper')
exports.insertFeedbacks = function (data) {
    return new Promise(async function (resolve, reject) {
        var id = await helper.genrenateID("Feedbacks");
        var params = {
            TableName: "Feedbacks",
            Item: {
                "feedback_id": ++id,
                "email": data.email,
                "content": data.content
            }
        };

        return docClient.put(params, function (err, data) {
            console.log("put ne " + data);
            if (err) {
                reject(err)

            } else {
                resolve(data);
            }
        })
    }).catch(error => {
        logger.error(error);
        return reject(error);
    });
}

exports.getFeedbacks = function () {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'Feedbacks',

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
exports.getFeedbacksDetail = function (feedback_id) {
    return new Promise(function (resolve, reject) {
        helper.findFeedbackbyID(feedback_id).then(result => {
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
exports.Deletefeedback = function (data) {
    return new Promise(function (resolve, reject) {
        helper.findFeedbackbyID(data.feedbacks_id).then(function () {

            var params = {
                TableName: 'Feedbacks',
                Key: {
                    "feedbacks_id": data.feedbacks_id
                },
                ConditionExpression: "info.rating <= :val",
                ExpressionAttributeValues: {
                    ":val": 5.0
                }
            };
            return docClient.delete(params, function (err, data) {
                console.log("Dang xoa" + data);
                if (err) {
                    resolve({
                        statusCode: 400,
                        err: 'Could not delete massege:${err.stack} '
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
};