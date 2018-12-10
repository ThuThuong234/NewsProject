var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const errors = require('../../lib/errors');
const helper = require('../helpers/api_helper')
exports.insertFeedbacks = function (data) {
    return new Promise(async function (resolve, reject) {
        console.log(data);
        let id = await helper.genrenateID();
        var params = {
            TableName: "Feedbacks",
            Item: {
                "feedback_id": id,
                "email": data.email,
                "content": data.content
            }
        };
        return docClient.put(params, function (err, data) {
            console.log(" Dang put " + data);
            if (err) {
                reject(err);
            }
            else {
                if (data == null){
                    throw {
                        message: errors.CREATE,
                        code: 'CREATE'
                    };
            }
        else
            resolve(data);
        }
        });
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
exports.Deletefeedback = function (feedback_id) {
    return new Promise(function (resolve, reject) {
        helper.findFeedbackbyID(feedback_id).then(search_feedback => {
            console.log(search_feedback.Items);
            if (search_feedback.Items.length == 0) {
                throw {
                    message: errors.TEMPLATE_01,
                    code: 'TEMPLATE_01'
                };
            }
            else {
                console.log(search_feedback.Items[0].feedback_id);
                console.log(search_feedback.Items[0].email);
                var params = {
                    TableName: 'Feedbacks',
                    Key: {
                        "feedback_id": search_feedback.Items[0].feedback_id,
                        "email": search_feedback.Items[0].email
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