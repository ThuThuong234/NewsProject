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
// var allFeedbacks = JSON.parse(fs.readFileSync("../data/newsdata.json", "utf-8"));
// var loadAllData = allFeedbacks.forEach(function (news) {
//
//     var feedback_params = {
//         TableName: "News",
//         Item: {
//             "news_id": news.news_id,
//             "username":news.username,
//             "type_id": news.type_id,
//             "title": news.title,
//             "content": news.content,
//             "image": news.image,
//             "postdate": news.postdate
//         }
//     };
//
//     docClient.put(feedback_params, function (err, data) {
//         if (err)
//             console.log("Unable to add news ", news.title, ". Error Json:", JSON.stringify(err, null, 2));
//         else
//             console.log("PutItem Successed: ", news.title);
//     });
// });
exports.getlistnews = function () {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'News',

        };
        return docClient.scan(params).promise().then(result => {
            if (result.Items.length == 0) {
                throw {
                    message: errors.TEMPLATE_01,
                    code: 'TEMPLATE_01'
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
exports.Getlastestnews = function (news_id) {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'News',
            Limit: 2,
            ProjectionExpression: "#news_id,user_id,title,content,image,postdate",
            KeyConditionExpression: "#news_id= :news_id",
            ExpressionAttributeNames: {
                "#news_id": "news_id"
            },
            ExpressionAttributeValues: {
                ":news_id": parseInt(news_id)
            }
        };
        return docClient.scan(params).promise().then(result => {
            if (result.Items.length == 0) {
                throw {
                    message: errors.TEMPLATE_01,
                    code: 'TEMPLATE_01'
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
exports.Search = function (search_data) {
    return new Promise(function (resolve, reject) {console.log(search_data)
        var params = {
            TableName: "News",
            ScanFilter: {
                'title': {
                    ComparisonOperator: "CONTAINS",
                    AttributeValueList: [
                        search_data,
                    ]
                },
            }
        }
        docClient.scan(params, function(err, data) {
            console.log("Dang tim" + data);
            if (err)
                return reject(err);
            else resolve(data);
        })
    }).catch(error => {
        logger.error(error);
        return reject(error);
    });
};
exports.Deletenews = function (news_id) {
    return new Promise(function (resolve, reject) {
       helper.findNewsbyID(news_id).then(search_news => {
           console.log(search_news.Items);
           if(search_news.Items.length==0){
               throw {
                   message: errors.TEMPLATE_01,
                   code: 'TEMPLATE_01'
               };
           }
           else {
               console.log(search_news.Items[0].news_id);
               console.log(search_news.Items[0].username);
               var params = {
                   TableName: 'News',
                   Key: {
                       "news_id": search_news.Items[0].news_id,
                       "username": search_news.Items[0].username
                   },
               };
               return docClient.delete(params, function (err, data) {
                   console.log("Dang xoa" + data);
                   if (err) {
                       reject(err);
                   }
                   else {
                       resolve(data);
                   }
               })
           }
       }).catch(error => {
           logger.error(error);
           return reject(error);
       });
    })
};

