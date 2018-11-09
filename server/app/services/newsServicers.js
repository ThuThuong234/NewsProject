var AWSConnect = require("../connectAWS/ConnectAWS");
var fs = require("fs");

var docClient = AWSConnect.docClient;

var fs = require("fs");
var allFeedbacks = JSON.parse(fs.readFileSync("../data/news.json", "utf-8"));
var loadAllData = allFeedbacks.forEach(function (news) {

    var feedback_params = {
        TableName: "News",
        Item: {
            "news_id": news.feedback_id,
            "user_id":news.email,
            "title": news.title,
            "news_content": news.content,
            "image": news.image,
            "postdate": news.postdate
        }
    };

    docClient.put(feedback_params, function (err, data) {
        if (err)
            console.log("Unable to add news ", feedback.email, ". Error Json:", JSON.stringify(err, null, 2));
        else
            console.log("PutItem Successed: ", feedback.email);
    });
});

// exports.getlist = function () {
//     return new Promise(function (resolve, reject) {
//         var params = {
//             TableName: 'Users',
//
//         };
//         return docClient.scan(params).promise().then(result => {
//             if (result == null) {
//                 throw {
//                     message: errors.TEMPLATE_01,
//                     code: 'TEMPLATE_01'
//                 };
//             }
//             return resolve(result);
//         })
//             .catch(error => {
//                 logger.error(error);
//                 return reject(error);
//             });
//     });
// };
// exports.Deletenews =function (id) {
//     return new Promise(function (resolve, reject) {
//
//         var params = {
//             TableName: 'Users',
//             Key:{
//                 "news_id": id
//             },
//             ConditionExpression:"info.rating <= :val",
//             ExpressionAttributeValues: {
//                 ":val": 8.0
//             },
//
//         };
//         docClient.query(request_id).then(news_id => {
//             if (!news_id) {
//                 console.log(news_id);
//                 throw {
//                     message: errors.TEMPLATE_01,
//                     code: 'TEMPLATE_01'
//                 };
//             }
//
//             var params = {
//                 TableName: "Users",
//                 Item: data
//             };
//
//             return docClient.delete(params).catch(error => {
//             logger.error(error);
//             return reject(error);
//         });
//     })
//     });
// };
// exports.Getlastestnews =function (date) {
//     return new Promise(function (resolve, reject) {
//
//         var params = {
//             TableName: 'News',
//             Key:{
//                 "news_id": id
//             },
//             ConditionExpression:"info.rating <= :val",
//             ExpressionAttributeValues: {
//                 ":val": 8.0
//             },
//
//         };
//         docClient.query(request_date).then(news_date => {
//             if (!news_date) {
//                 console.log(news_date);
//                 throw {
//                     message: errors.TEMPLATE_01,
//                     code: 'TEMPLATE_01'
//                 };
//             }
//
//             var params = {
//                 TableName: "News",
//                 Item: data
//             };
//
//             return docClient.get(params).catch(error => {
//                 logger.error(error);
//                 return reject(error);
//             });
//         })
//     });
// };
