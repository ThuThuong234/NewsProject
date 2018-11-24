var AWSConnect = require("../connectAWS/ConnectAWS");
var fs = require("fs");
const log4js = require('log4js');
const logger = log4js.getLogger('auth_utils');
const auth_utils = require('../../lib/auth_utils');
const ldap_utils = require('../../lib/ldap_utils');
const errors = require('../../lib/errors');
const helper = require('../helpers/api_helper');


var docClient = AWSConnect.docClient;

exports.Getlastestnews = function () {
    return new Promise(function (resolve, reject) {
        var params = {
            TableName: 'News',
            Limit: 1,
            ProjectionExpression: "news_id,user_id,title,content,image,postdate",
            ScanIndexForward : false,
        }
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
    return new Promise(function (resolve, reject) {
        console.log(search_data)
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
        docClient.scan(params, function (err, data) {
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
            if (search_news.Items.length == 0) {
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
exports.insertNews = function (data) {
    return new Promise(async function (resolve, reject) {

        let id = helper.genrenateID();
        var params = {
            TableName: "News",
            Item: {
                "news_id": id,
                "username": data.username,
                "type_id": data.type_id,
                "title": data.title,
                "content": data.content,
                "image": data.image,
                "postdate": data.postdate
            }
        };
        return docClient.put(params, function (err, data) {
            console.log("Dang put" + data);
            if (err) {
                reject(err);
            }
            else {
                if (data == null) {
                    throw {
                        message: errors.CREATE,
                        code: 'CREATE'
                    };
                }
                else
                    resolve(data);
            }
        });
    }).catch(error => {
        logger.error(error);
        return reject(error);
    });
}
exports.getNews = function (news_id) {
    return new Promise(function (resolve, reject) {
        helper.findNewsbyID(news_id).then(result => {
            if (result.Items.length == 0) {
                throw {
                    message: errors.TEMPLATE_01,
                    code: 'TEMPLATE_01'
                };
            }
            console.log(result);
            return resolve(result);
        })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};
exports.getNewsbyTypeId = function (type_id) {
    return new Promise(function (resolve, reject) {
        console.log(type_id);
        helper.findNewsbyTypeId(type_id).then(result => {
            console.log(result.Items);
            if (result.Items.length == 0) {
                throw {
                    message: errors.TEMPLATE_01,
                    code: 'TEMPLATE_01'
                };
            }
            console.log(result);
            return resolve(result);
        })
            .catch(error => {
                logger.error(error);
                return reject(error);
            });
    });
};
exports.updateNews = function (data) {
    return new Promise(function (resolve, reject) {
        helper.findNewsbyID(data.news_id)
            .then(function () {
                var params = {
                    TableName: "News",
                    Key: {
                        "news_id": data.news_id,
                        "username": data.username,
                    },
                    UpdateExpression: "set title = :t,type_id=:y, content=:c, image=:i,postdate=:p",
                    ExpressionAttributeValues: {
                        ":t": data.title,
                        ":y": data.type_id,
                        ":c": data.content,
                        ":i": data.image,
                        ":p": data.postdate,
                    },
                    ReturnValue: "UPDATE_NEW"
                };
                return docClient.update(params, function (err, data) {
                    console.log("Dang cap nhat" + data);
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                })
            }).catch(error => {
            logger.error(error);
            return reject(error);
        });
    })
}

