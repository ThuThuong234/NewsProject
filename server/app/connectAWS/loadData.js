const helper = require('../helpers/api_helper');
var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
var fs = require("fs");

let feedback_id = 0;
let news_id = 0;

var allFeedbacks = JSON.parse(fs.readFileSync("../data/feedbacks.json", "utf-8"));
var allNews = JSON.parse(fs.readFileSync("../data/newsdata.json", "utf-8"));

// var loadAllDataFeedbacks = allFeedbacks.forEach(async function (feedback) {
//
//     console.log("dfadf" + feedback_id);
//     var feedback_params = {
//         TableName: "Feedbacks",
//         Item: {
//             "feedback_id": ++feedback_id,
//             "email": feedback.email,
//             "content": feedback.content
//         }
//     };
//
//     docClient.put(feedback_params, function (err, data) {
//         if (err)
//             console.log("Unable to add news ", feedback.email, ". Error Json:", JSON.stringify(err, null, 2));
//         else
//             console.log("PutItem Successed: ", feedback.email);
//     });
//
//
// });

var loadAllDataNews = allNews.forEach(function (news) {

    var new_params = {
        TableName: "News",
        Item: {
            "news_id": ++news_id,
            "username":news.username,
            "type_id": news.type_id,
            "title": news.title,
            "content": news.content,
            "image": news.image,
            "postdate": news.postdate
        }
    };

    docClient.put(new_params, function (err, data) {
        if (err)
            console.log("Unable to add news ", news_id, ". Error Json:", JSON.stringify(err, null, 2));
        else
            console.log("PutItem Successed: ", news_id);
    });
});