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
        helper.findCommentbyID(data.news_id).then(type => {
            if (type.Items.length != 0) {
                var notice = {
                    message: errors.NEWS_01,
                    code: 'NEWS_01'
                }
                return reject(notice);
            }
            else {
                var params = {
                    TableName: "Comments",
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
                        "comments_content" : data.comments_content
                    },
                    UpdateExpression: "set email = :e,comment_time= :c",
                    ExpressionAttributeValues: {
                        ":e": data.email,
                        ":c": data.comment_time,
                    },
                    ReturnValue: "UPDATE_COMMENT"
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
exports.deleteComment = function (news_id) {
    return new Promise(function (resolve, reject) {
        helper.findCommentbyID(news_id).then(search_newsid => {
            console.log(search_newsid.Items);
            if(search_newsid.Items.length==0){
                throw {
                    message: errors.TEMPLATE_01,
                    code: 'TEMPLATE_01'
                };
            }
            else {
                console.log(search_newsid.Items[0].news_id);
                console.log(search_newsid.Items[0].comments_content);
                var params = {
                    TableName: 'Comments',
                    Key: {
                        "news_id": search_newsid.Items[0].news_id,
                        "username": search_newsid.Items[0].comments_content
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


