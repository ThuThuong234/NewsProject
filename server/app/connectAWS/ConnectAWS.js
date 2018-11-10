var AWS = require("aws-sdk");
var fs = require('fs');
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId:"AKIAJA3T6QOVJETFZS2Q",
  secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamoConnection : dynamodb,
    docClient : docClient
};