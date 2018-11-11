'use strict';

const errors = require("../../lib/errors");
var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;

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

exports.findFeedbackbyID = function (feedback_id) {
    return new Promise(function (resolve, reject) {
        var request_id = {
            TableName: "Feedbacks",
            ProjectionExpression: "#feedback_id",
            KeyConditionExpression: "#feedback_id = :feedback_id",
            ExpressionAttributeNames: {
                "#feedback_id": "feedback_id"
            },
            ExpressionAttributeValues: {
                ":feedback_id": feedback_id
            }
        };

        docClient.query(request_id, function (err, feedback) {
            console.log("getfeedback from id: " + feedback.Items);
            if (err)
                return reject(+err);
            else resolve(feedback);
        });
    });
}
exports.findNewsbyID = function (news_id) {
    return new Promise(function (resolve, reject) {
        var request_id = {
            TableName: "Users",
            ProjectionExpression: "#news_id",
            KeyConditionExpression: "#news_id = :news_id",
            ExpressionAttributeNames: {
                "#news_id": "news_id"
            },
            ExpressionAttributeValues: {
                ":news_id": news_id
            }
        };

        docClient.query(request_id, function (err, news) {
            console.log("get News from id: " + news.Items);
            if (err)
                return reject(err);
            else if (news.Items.length != 0){
                var notice = {
                    message: errors.NEWS_02,
                    code: 'NEWS_02'
                }
                return reject(notice);
            }
            else resolve(news);
        });
    });
}