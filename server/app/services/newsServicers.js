var AWSConnect = require("../connectAWS/ConnectAWS");
var fs = require("fs");
const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const auth_utils = require('../../lib/auth_utils');
const ldap_utils = require('../../lib/ldap_utils');
const errors = require('../../lib/errors')
const helper = require('../helpers/api_helper');
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

 exports.getlist = function () {
    return new Promise(function (resolve, reject) {
        var params = {
           TableName: 'Users',
            KeyConditionExpression: "#id:= yyyy",
            ExpressionAttributeNames:{  "#id": "id"}
        };
        return docClient.scan(params).promise().then(result => {
           if (result == null) {
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
 exports.Deletenews =function (id) {
    return new Promise(function (resolve, reject) {
        helper.findNewsbyID(data.news_id).then(function (){
        var params = {
          TableName: 'Users',
             Key:{
               "id":body.id
             },
             ConditionExpression:"info.rating <= :val",
             ExpressionAttributeValues: {
                 ":val": 8.0
             },

        };
            return docClient.delete(params).catch(error => {
                console.log("Dang xoa" + data);
                if (err) {
                    resolve({
                        statusCode: 400,
                        err: 'Could not delete massege:${err.stack} '
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
 };

exports.Getlastestnews = function (news_id) {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: "Users",
            Limit: '10',
            ProjectionExpression: "#news_id",
            KeyConditionExpression: "#news_id = :news_id",
            ExpressionAttributeNames: {
                "#news_id": "news_id"
            },
            ExpressionAttributeValues: {
                ":news_id": news_id
            }
        };

        return docClient.scan(params).catch(error => {
            console.log("Dang lay ve" + data);
            if (err) {
                resolve({
                    statusCode: 400,
                    err: 'Could not get new:${err.stack} '
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
};
