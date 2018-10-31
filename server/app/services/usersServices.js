var AWSConnect = require("../connectAWS/ConnectAWS");
var fs = require("fs");

var docClient = AWSConnect.docClient;

console.log("Importing data into DynamoDB. Please wait.");
var allUser = JSON.parse(fs.readFileSync("../data/newsdata.json", "utf-8"));
var loadAllData = allUser.forEach(function (user) {
    var news_data = user.news_data;
    console.log("aaa " + news_data);

    var load_comments = news_data.comments.forEach(function () {
        return {
            "username": news_data.comments.username,
            "content": news_data.comments.content
        }
    })

    var load_news = news_data.forEach(function (news) {
        return {
            "news_id": news.id,
            "title": news.title,
            "content": news.content,
            "image": news.image,
            "comments": load_comments
        }
    });

    var user_params = {
        TableName: "Users",
        Item: {
            "user_id": 1,
            "username": user.username,
            "password": user.password,
            "news": load_news
        }
    };

    docClient.put(user_params, function (err, data) {
        if (err)
            console.log("Unable to add news ", user.username, ". Error Json:", JSON.stringify(err, null, 2));
        else
            console.log("PutItem Successed: ", user.username);
    });
});

module.exports = {
    loadAllData: loadAllData
};