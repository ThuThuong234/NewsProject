'use strict';

const errors = require("../../lib/errors");
var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
var aws = AWSConnect.dynamoConnection;
var datetime = require('node-datetime');

exports.successResponse = function (data = null) {
    if (data == null) {
        return {
            success: true
        };
    }

    return {
        success: true,
        data: data
    };
};

exports.failedResponse = function (error = null) {
    if (error != null) {
        if (error.name == 'SequelizeDatabaseError') {
            return {
                success: false,
                message: errors.SERVICE_01,
                code: 'SERVICE_01'
            };
        }

        if (error.name == 'JsonWebTokenError') {
            return {
                success: false,
                message: errors.AUTHORIZE_01,
                code: 'AUTHORIZE_01'
            };
        }

        if (error.message && error.code) {
            return {
                success: false,
                message: error.message,
                code: error.code
            };
        }

        if (error.message) {
            return {
                success: false,
                message: error.message,
                code: 'SERVICE_01'
            };
        }
    }

    return {
        success: false,
        message: errors.SERVICE_01,
        code: 'SERVICE_01'
    };
};
exports.genrenateID = function( ){
    var pastDateTime = datetime.create();
    let pastNow = pastDateTime.now();

    return Number(pastNow);
};
exports.findFeedbackbyID = function (feedback_id) {
    return new Promise(function (resolve, reject) {
        var request_id = {
            TableName: "Feedbacks",
            ProjectionExpression: "#feedback_id,email,content",
            KeyConditionExpression: "#feedback_id = :feedback_id",
            ExpressionAttributeNames: {
                "#feedback_id": "feedback_id"
            },
            ExpressionAttributeValues: {
                ":feedback_id": parseInt(feedback_id)
            }
        };

        docClient.query(request_id, function (err, feedback) {
            console.log("Get feedback from id: " + feedback.Items);
            if (err)
                return reject(+err);
            else resolve(feedback);
        });
    });
}
exports.findNewsbyID = function (news_id) {
    return new Promise(function (resolve, reject) {
        var request_id = {
            TableName: "News",
            ProjectionExpression: "#news_id,username,type_id,title,content,image,postdate",
            KeyConditionExpression: "#news_id = :news_id",
            ExpressionAttributeNames: {
                "#news_id": "news_id"
            },
            ExpressionAttributeValues: {
                ":news_id": parseInt(news_id)
            }
        };

        docClient.query(request_id, function (err, news) {
            console.log("Get News from id: " + news.Items);
            if (err)
                return reject(err);
            else resolve(news);
        });
    });
};
exports.findCommentbyID = function (news_id) {
    return new Promise(function (resolve, reject) {
        var request_id = {
            TableName: "Comments",
            ProjectionExpression: "#news_id,email,comments_content,comment_time",
            KeyConditionExpression: "#news_id = :news_id",
            ExpressionAttributeNames: {
                "#news_id": "news_id"
            },
            ExpressionAttributeValues: {
                ":news_id": parseInt(news_id)
            }
        };

        docClient.query(request_id, function (err, news) {
            console.log("get Comments from id: " + news.Items);
            if (err)
                return reject(err);
            else resolve(news);
        });
    });
}
exports.findUsersbyName = function (username) {
    return new Promise(function (resolve, reject) {
        var request_id = {
            TableName: "Users",
            ProjectionExpression: "#username,password",
            KeyConditionExpression: "#username = :username",
            ExpressionAttributeNames: {
                "#username": "username"
            },
            ExpressionAttributeValues: {
                ":username": username
            }
        };

        docClient.query(request_id, function (err, user) {
            console.log("Get Users from name: " + user.Items);
            if (err)
                return reject(err);
            else resolve(user);
        });
    });
}
exports.findTypebyId = function (type_id) {
    return new Promise(function (resolve, reject) {
        var request_id = {
            TableName: "TypeNew",
            ProjectionExpression: "#type_id,typename",
            KeyConditionExpression: "#type_id = :type_id",
            ExpressionAttributeNames: {
                "#type_id": "type_id"
            },
            ExpressionAttributeValues: {
                ":type_id": parseInt(type_id)
            }
        };

        docClient.query(request_id, function (err, type) {
            console.log("Get TypeNew from id: " + type.Items);
            if (err)
                return reject(err);
            else resolve(type);
        });
    });
}
exports.findNewsbyTypeId = function (type_id) {
    return new Promise(function (resolve, reject) {
        var request_id = {
            TableName: "News",
            ProjectionExpression: "news_id,username,type_id,title,content,image,postdate",
            FilterExpression: "type_id = :type_id",
            ExpressionAttributeValues: {
                ":type_id": parseInt(type_id)
            }
        };
        docClient.scan(request_id, function (err, type) {
            // console.log("Get News Type from id: " + type.Items);
            if (err)
                return reject(err);
            else resolve(type);
        });
    });
}

