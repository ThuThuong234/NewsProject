var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const errors = require('../../lib/errors');
const helper = require('../helpers/api_helper')
var fs = require("fs");
var allComments = JSON.parse(fs.readFileSync("../data/comments.json", "utf-8"));
var loadAllData = allFeedbacks.forEach(function (comment) {

    var feedback_params = {
        TableName: "Comments",
        Item: {
            "email": comment.feedback_id,
            "news_id": comment.email,
            "comments_content": comment.comments_content,
            "comment_time": comment.comment_time
        }
    };

    docClient.put(feedback_params, function (err, data) {
        if (err)
            console.log("Unable to add news ", feedback.email, ". Error Json:", JSON.stringify(err, null, 2));
        else
            console.log("PutItem Successed: ", feedback.email);
    });
});