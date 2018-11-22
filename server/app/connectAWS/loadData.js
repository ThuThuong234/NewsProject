const helper = require('../helpers/api_helper');
var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
var fs = require("fs");
var allFeedbacks = JSON.parse(fs.readFileSync("../data/feedbacks.json", "utf-8"));
let feedback_id = 0;
var loadAllData = allFeedbacks.forEach(async function (feedback) {

    console.log("dfadf" + feedback_id);
    var feedback_params = {
        TableName: "Feedbacks",
        Item: {
            "feedback_id": ++feedback_id,
            "email": feedback.email,
            "content": feedback.content
        }
    };

    docClient.put(feedback_params, function (err, data) {
        if (err)
            console.log("Unable to add news ", feedback.email, ". Error Json:", JSON.stringify(err, null, 2));
        else
            console.log("PutItem Successed: ", feedback.email);
    });


});
