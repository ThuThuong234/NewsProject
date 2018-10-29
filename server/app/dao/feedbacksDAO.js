var AWSConnect = require("../connectAWS/ConnectAWS");
var fs = require("fs");

var docClient = AWSConnect.docClient;

console.log("Importing data into DynamoDB. Please wait.");
var allFeedbacks = JSON.parse(fs.readFileSync("../data/feedbacks.json","utf-8"));
var loadAllData = allFeedbacks.forEach(function (feedback) {
    var params = {
        TableName: "Feedbacks",
        Item: {
            "id" : feedback.id,
            "new_id" : feedback.new_id,
            "content" : feedback.content,
            "reader_email" : feedback.reader_email
        }
    };

    docClient.put(params,function (err, data) {
        if (err)
            console.log("Unable to add feedback ", feedback.title,". Error Json:", JSON.stringify(err,null,2));
        else
            console.log("PutItem Successed: ",feedback.title);
    });
});

module.exports = {
    loadAllData : loadAllData
};