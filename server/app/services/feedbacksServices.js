
var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const errors = require('../../lib/errors');
const helper = require('../helpers/api_helper')
var fs = require("fs");
// var allFeedbacks = JSON.parse(fs.readFileSync("../data/feedbacks.json", "utf-8"));
// var loadAllData = allFeedbacks.forEach(function (feedback) {
//
//     var feedback_params = {
//         TableName: "Feedbacks",
//         Item: {
//             "feedback_id": feedback.feedback_id,
//             "email":feedback.email,
//             "content":feedback.content
//         }
//     };
//
//     docClient.put(feedback_params, function (err, data) {
//         if (err)
//             console.log("Unable to add news ", feedback.email, ". Error Json:", JSON.stringify(err, null, 2));
//         else
//             console.log("PutItem Successed: ", feedback.email);
//     });
// });

exports.insertFeedbacks = function(data) {
    return  new Promise(function (resolve, reject) {
           helper.findFeedbackbyID(data.feedback_id).then(feedback =>{
               if (feedback.Items.length != 0){
                   var notice = {
                       message: errors.FEEDBACK_02,
                       code: 'FEEDBACK_02'
                   }
                   return reject(notice);
               }
               else {
                   var params = {
                       TableName: "Feedbacks",
                       Item: data
                   };

                   return docClient.put(params, function (err, data) {
                       console.log("put ne " + data);
                       if (err) {
                           resolve({
                               statusCode: 400,
                               error: `Could not create message: ${err.stack}`
                           });

                       } else {
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

exports.getFeedbacks = function () {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'Feedbacks',

        };
        console.log("aaaa")
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
exports.getFeedbackdetails = function () {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'Feebbacks',
            ProjectionExpression: "#feedback_id,email,email,content",
            KeyConditionExpression: "#feedback_id= :feedback_id",
            ExpressionAttributeNames: {
                "#feedback_id": "feedback_id"
            },
            ExpressionAttributeValues: {
                ":feedback_id": parseInt(news_id)
            }
        };


        return docClient.query(params).promise().then(result => {
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
exports.Deletefeedback =function (data) {
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

