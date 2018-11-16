var AWSConnect = require("../connectAWS/ConnectAWS");
var fs = require("fs");
const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const auth_utils = require('../../lib/auth_utils');
const ldap_utils = require('../../lib/ldap_utils');
const errors = require('../../lib/errors');
const helper = require('../helpers/api_helper');
var docClient = AWSConnect.docClient;

var fs = require("fs");
var allFeedbacks = JSON.parse(fs.readFileSync("../data/newsdata.json", "utf-8"));
var loadAllData = allFeedbacks.forEach(function (news) {
  id = helper.genrenateID();
    var feedback_params = {
        TableName: "News",
        Item: {
            "news_id": id,
            "username": news.username,
            "title": news.title,
            "news_content": news.content,
            "image": news.image,
            "postdate": news.postdate
        }
    };

    docClient.put(feedback_params, function (err, data) {
        if (err)
            console.log("Unable to add news ", id, ". Error Json:", JSON.stringify(err, null, 2));
        else
            console.log("PutItem Successed: ", id);

    });
});

// var params = {
//     TableName: 'News',
// };
// docClient.scan(params, onScan);
// function onScan(err,data ) {
//     if (err) {
//         console.error("dataUnable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log(data);
//
//         return;
//     }
// }
//  exports.getlist = function () {
//     return new Promise(function (resolve, reject) {
//         var params = {
//            TableName: 'Users',
//             KeyConditionExpression: "#id:= yyyy",
//             ExpressionAttributeNames:{  "#id": "id"}
//         };
//         return docClient.scan(params).promise().then(result => {
//            if (result == null) {
//                throw {
//                    message: errors.TEMPLATE_01,
//                    code: 'TEMPLATE_01'
//               };
//              }
// //            return resolve(result);
// //         })
//            .catch(error => {
//                logger.error(error);
//                 return reject(error);
//             });
//   });
//  };
// exports.Deletenews =function (id) {
//     return new Promise(function (resolve, reject) {
//         helper.findNewsbyID(data.news_id).then(function () {
//
//             var params = {
//                 TableName: 'Users',
//                 Key: {
//                     "news_id": id
//                 },
//                 ConditionExpression: "info.rating <= :val",
//                 ExpressionAttributeValues: {
//                     ":val": 8.0
//                 },
//
//             };
//             return docClient.delete(params).catch(error => {
//                 console.log("Dang xoa" + data);
//                 if (err) {
//                     resolve({
//                         statusCode: 400,
//                         err: 'Could not delete massege:${err.stack} '
//                     });
//                 }
//                 else {
//                     resolve({statusCode: 200, body: JSON.stringify(param.Item)});
//                 }
//             })
//         }).catch(error => {
//             logger.error(error);
//             return reject(error);
//         });
//     });
// var params = {
//     TableName: 'News',
// };
// docClient.scan(params, onScan);
// function onScan(err,data ) {
//     if (err) {
//         console.error("dataUnable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log(data);
//
// exports.Getlastestnews = function (news_id) {
//     return new Promise(function (resolve, reject) {
//         var params = {
//             TableName: "News",
//             Limit: 2,
//             ProjectionExpression: "#news_id",
//             KeyConditionExpression: "#news_id = :news_id",
//             ExpressionAttributeNames: {
//                 "#news_id": "news_id"
//             },
//             ExpressionAttributeValues: {
//                 ":news_id": news_id
//             }
//         };
//
//         return docClient.scan(params).catch(error => {
//             console.log("Dang lay ve" + data);
//             if (err) {
//                 resolve({
//                     statusCode: 400,
//                     err: 'Could not get new:${err.stack} '
//                 });
//             }
//             else {
//                 resolve({statusCode: 200, body: JSON.stringify(param.Item)});
//             }
//         })
//     }).catch(error => {
//         logger.error(error);
//         return reject(error);
//     });
// };
//         return;
//     }
// }
//
// exports.getlistnews = function () {
//     return new Promise(function (resolve, reject) {
//         var params = {
//             TableName: 'News',
//
//         };
//         return docClient.scan(params).promise().then(result => {
//             if (result.Items.length== 0 ) {
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
// exports.Deletenews =function (data) {
//     return new Promise(function (resolve, reject) {
//         helper.findNewsbyID(data.news_id).then(function () {
//
//             var params = {
//                 TableName: 'Users',
//                 Key: {
//                     "news_id": data.news_id
//                 },
//                 ConditionExpression: "info.rating <= :val",
//                 ExpressionAttributeValues: {
//                     ":val": 5.0
//                 }
//             };
//             return docClient.delete(params, function (err, data) {
//                 console.log("Dang xoa" + data);
//                 if (err) {
//                     resolve({
//                         statusCode: 400,
//                         err: 'Could not delete massege:${err.stack} '
//                     });
//                 }
//                 else {
//                     resolve({statusCode: 200, body: JSON.stringify(params.Item)});
//                 }
//             })
//         }).catch(error => {
//             logger.error(error);
//             return reject(error);
//         });
//     })
// };
//
//
// exports.Getlastestnews = function () {
//     return new Promise(function (resolve, reject) {
//         var params = {
//             TableName: 'News',
//             KeyConditionExpression: "#news_id= :news_id",
//             Limit: 2,
//             ScanIndexForward: false
//
//
//         };
//         return docClient.query(params).promise().then(result => {
//             if (result.Items.length== 0 ) {
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
// exports.Search = function (news_id) {
//     return new Promise(function (resolve, reject) {
//         var params = {
//             TableName: "News",
//             ProjectionExpression:"#postdate, title, info.genres, info.actors[0]",
//             KeyConditionExpression: "#string = :yyyy and title between :letter1 and :letter2",
//             ExpressionAttributeNames: {
//                 "#postdate": "postdate"
//
//             },
//             ExpressionAttributeValues: {
//                 ":postdate": parseInt(req.params.txtYear),
//                 ":letter1": "A",
//                 ":letter2": "L"
//             }
//         };
//         docClient.query(params, function(err, data) {
//             if (err) {
//                 console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
//             } else {
//                 console.log("Query succeeded.");
//                 data.Items.forEach(function(item) {
//                     console.log(" -", item.postdate + ": " + item.title
//                         + " ... " + item.info.genres
//                         + " ... " + item.info.actors[0]);
//                 });
//             }
//         });
// }
