var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;
var fs = require("fs");

const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const errors = require('../../lib/errors');
const helper = require('../helpers/api_helper');

console.log("Importing data into DynamoDB. Please wait.");
// var allUser = JSON.parse(fs.readFileSync("../data/newsdata.json", "utf-8"));
// var loadAllData = allUser.forEach(function (user) {
//     var news_data = user.news_data;
//     console.log("aaa " + news_data);
//
//     var load_comments = news_data.comments.forEach(function () {
//         return {
//             "username": news_data.comments.username,
//             "content": news_data.comments.content
//         }
//     })
//
//     var load_news = news_data.forEach(function (news) {
//         return {
//             "news_id": news.id,
//             "title": news.title,
//             "content": news.content,
//             "image": news.image,
//             "postdate": news.postdate,
//             "comments": load_comments
//         }
//     });
//
//     var user_params = {
//         TableName: "Users",
//         Item: {
//             "user_id": 1,
//             "username": user.username,
//             "password": user.password,
//             "news_data": load_news
//         }
//     };
//
//     docClient.put(user_params, function (err, data) {
//         if (err)
//             console.log("Unable to add news ", user.username, ". Error Json:", JSON.stringify(err, null, 2));
//         else
//             console.log("PutItem Successed: ", user.username);
//     });
// });
//
// module.exports = {
//     loadAllData: loadAllData
// };
exports.insertNews = function (data) {
    return new Promise(function (resolve,reject) {
        helper.findNewsbyID(data.news_id).then(function () {
            var params = {
                TableName: "Users",
                Item: data
            }
        });
        return docClient.put(params, function (err, data) {
            console.log("Dang put code" + data);
            if (err) {
                resolve({
                    statusCode: 400,
                    err: 'Could not create massege:${err.stack} '
                });
            }
            else {
                resolve({statusCode: 200, body: JSON.stringify(param.Item)});
            }
        })
    }).catch(error => {
        logger.error(error);
        return reject(error);
    });
}
exports.getNews = function () {
    return new Promise(function (resolve,reject) {

        var params = {
            TableName:'Users',
            KeyConditionExpression: "#id:= yyyy",
            ExpressionAttributeNames:{  "#id": "id"
    },
        ExpressionAttributeValues: {
            ":yyyy": parseInt(req.params.id)
        }
        };
        return docClient.query(params).promise().then(result =>{
            if (result ==null)
            {
                throw {
                    message: errors.GETNEWS_02,
                    code:'GETNEWS_02'
                };
            }
            return resolve(result);
        })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};
exports.updateNews = function (data) {
    return new Promise(function (resolve,reject) {
        helper.findNewsbyID(data.news_id).then(function () {
            var params = {
                TableName: "Users",
                Key: {
                    "id": body.id,
                    "title": body.title,
                    "content": body.content,
                    "image": body.image,
                    "postdate": body.postdate
                }
            };
            console.log("Updating the item...");
            return docClient.update(params, function (err, data) {
                console.log("Dang update item" + data);
                if (err) {
                    resolve({
                        statusCode: 400,
                        err: 'Could not update massege:${err.stack} '
                    });
                }
                else {
                    resolve({statusCode: 200, body: JSON.stringify(param.Item)});
                }
            })
        }).catch(error => {
            logger.error(error);
            return reject(error);
        });
    })
}


