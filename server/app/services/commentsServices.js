var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const errors = require('../../lib/errors');
const helper = require('../helpers/api_helper')
var fs = require("fs");
exports.insertComment = function (data) {
    return new Promise(async function (resolve, reject) {
        if(!helper.CheckEmail(data.email)){
            var notice = {
                message: errors.USER_03,
                code: 'USER_03'
            }
            return reject(notice);
        }
        else {
            var params = {
                TableName: "Comments",
                Item: {
                    "email": data.email,
                    "news_id": data.news_id,
                    "comments_content": data.comments_content,
                    "comment_time": data.comment_time
                }
            };
            return docClient.put(params, function (err, data) {
                console.log("Dang put" + data);
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
exports.getCommentsdetails = function (news_id) {
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
}
exports.updateComment = function (data) {
    return new Promise(function (resolve, reject) {
        helper.findCommentbyID(data.news_id)
            .then(function () {
                var params = {
                    TableName: "Comments",
                    Key: {
                        "news_id": data.news_id,
                        "comments_content": data.comments_content
                    },
                    UpdateExpression: "set email = :e,comment_time= :c",
                    ExpressionAttributeValues: {
                        ":e": data.email,
                        ":c": data.comment_time,
                    },
                    ReturnValue: "UPDATE_COMMENT"
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
exports.deleteComment = function (news_id) {
    return new Promise(function (resolve, reject) {
        helper.findCommentbyID(news_id).then(search_newsid => {
            console.log(search_newsid.Items);
            if (search_newsid.Items.length == 0) {
                throw {
                    message: errors.TEMPLATE_01,
                    code: 'TEMPLATE_01'
                };
            }
            else {
                search_newsid.Items.forEach(function(comment) {
                    console.log(search_newsid.Items[0].news_id);
                    console.log(search_newsid.Items[0].comments_content);
                    var params = {
                        TableName: 'Comments',
                        Key: {
                            "news_id": comment.news_id,
                            "comments_content": comment.comments_content
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
                });
            }
        }).catch(error => {
            logger.error(error);
            return reject(error);
        });
    })
};


