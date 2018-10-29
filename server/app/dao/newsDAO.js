var AWSConnect = require("../connection/AWSConnect");
var fs = require("fs");

var docClient = AWSConnect.docClient;

console.log("Importing data into DynamoDB. Please wait.");
var allNews = JSON.parse(fs.readFileSync("../data/newsdata.json","utf-8"));
var loadAllData = allNews.forEach(function (news) {
    var params = {
        TableName: "Movies",
        Item: {
            "id" : news.id,
            "title" : news.title,
            "content" : news.content,
            "user_id" : news.user_id
        }
    };

    docClient.put(params,function (err, data) {
        if (err)
            console.log("Unable to add news ", news.title,". Error Json:", JSON.stringify(err,null,2));
        else
            console.log("PutItem Successed: ",news.title);
    });
});

module.exports = {
    loadAllData : loadAllData
};