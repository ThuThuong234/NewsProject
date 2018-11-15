var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const errors = require('../../lib/errors');
const helper = require('../helpers/api_helper')
var fs = require("fs");
// var allComments = JSON.parse(fs.readFileSync("../data/comments.json", "utf-8"));
// var loadAllData = allComments.forEach(function (comment) {
//
//     var comment_params = {
//         TableName: "Comments",
//         Item: {
//             "email": comment.email,
//             "news_id": comment.news_id,
//             "comments_content": comment.comments_content,
//             "comment_time": comment.comment_time
//         }
//     };
//
//     docClient.put(comment_params, function (err, data) {
//         if (err)
//             console.log("Unable to add news ", comment.email, ". Error Json:", JSON.stringify(err, null, 2));
//         else
//             console.log("PutItem Successed: ", comment.email);
//     });
// });
exports.insertComment = function (data) {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: "Comments",
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
        });
    }).catch(error => {
        logger.error(error);
        return reject(error);
    });
};
exports.getComments = function () {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'Comments',

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
exports.getCommentsdetails = function () {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'Comments',
            ProjectionExpression: "#news_id,email,comments_content,comment_time",
            KeyConditionExpression: "#news_id= :news_id",
            ExpressionAttributeNames: {
                "#news_id": "news_id"
            },
            ExpressionAttributeValues: {
                ":news_id": parseInt(news_id)
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
exports.Deletecomments = function (data) {
    return new Promise(function (resolve, reject) {
        helper.findCommentbyID(data.news_id).then(function () {

            var params = {
                TableName: 'Comments',
                Key: {
                    "comments_content": data.comments_content
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


