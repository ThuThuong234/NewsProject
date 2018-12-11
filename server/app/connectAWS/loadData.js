const helper = require('../helpers/api_helper');
var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
var fs = require("fs");

var allFeedbacks = JSON.parse(fs.readFileSync("../data/feedbacks.json", "utf-8"));
var allNews = JSON.parse(fs.readFileSync("../data/newsdata.json", "utf-8"));
var allLoai = JSON.parse(fs.readFileSync("../data/typenew.json", "utf-8"));
var allUser = JSON.parse(fs.readFileSync("../data/users.json", "utf-8"));
var allComments = JSON.parse(fs.readFileSync("../data/comments.json", "utf-8"));


var loadAllDataFeedbacks = allFeedbacks.forEach(function (feedback) {
    let id = helper.genrenateID()
    var feedback_params = {
        TableName: "Feedbacks",
        Item: {
            "feedback_id":id ,
            "email": feedback.email,
            "content": feedback.content,
            "posted_date": feedback.posted_date
        }
    };

    docClient.put(feedback_params, function (err, data) {
        if (err)
            console.log("Unable to add news ", feedback.email, ". Error Json:", JSON.stringify(err, null, 2));
        else
            console.log("PutItem Successed: ", feedback.email);
    });


});

// var loadAllDataNews = allNews.forEach( function (news) {
//     let id = helper.genrenateID();
//
//     var new_params = {
//         TableName: "News",
//         Item: {
//             "news_id": id,
//             "username": news.username,
//             "type_id": news.type_id,
//             "title": news.title,
//             "content": news.content,
//             "image": news.image,
//             "postdate": news.postdate
//         }
//     };
//
//     docClient.put(new_params, function (err, data) {
//         if (err)
//             console.log("Unable to add news ", ". Error Json:", JSON.stringify(err, null, 2));
//         else
//             console.log("PutItem Successed: " + id);
//     });
// });
// var loadAllComment = allComments.forEach(function (comment) {
//     var comment_params = {
//         TableName: "Comments",
//         Item: {
//             "email": comment.email,
//             "news_id": comment.news_id,
//             "comments_content": comment.comments_content,
//             "comment_time": comment.comment_time
//         }
//     };
//     docClient.put(comment_params, function (err, data) {
//         if (err)
//             console.log("Unable to add news ", comment.email, ". Error Json:", JSON.stringify(err, null, 2));
//         else
//             console.log("PutItem Successed: ", comment.email);
//     });
// });
// var loadAlltype = allLoai.forEach(function (loai) {
//     let id = helper.genrenateID();
//     var type_params = {
//         TableName: "TypeNew",
//         Item: {
//             "type_id": id,
//             "typename": loai.typename
//         }
//     };
//     docClient.put(type_params, function (err, data) {
//         if (err)
//             console.log("Unable to add news ", loai.typename, ". Error Json:", JSON.stringify(err, null, 2));
//         else
//             console.log("PutItem Successed: ", loai.typename);
//     });
// });
// var loadAlluser = allUser.forEach(function (user) {
//
//     var user_params = {
//         TableName: "Users",
//         Item: {
//
//             "username": user.username,
//             "password": user.password,
//             "last_login": user.last_login,
//             "img": user.img,
//         }
//     };
//     docClient.put(user_params, function (err, data) {
//         if (err)
//             console.log("Unable to add news ", user.username, ". Error Json:", JSON.stringify(err, null, 2));
//         else
//             console.log("PutItem Successed: ", user.username);
//     });
// });
