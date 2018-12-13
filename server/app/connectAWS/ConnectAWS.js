var AWS = require("aws-sdk");
var fs = require('fs');
AWS.config.update({
  region: "us-west-2",
  // endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();
AWS.config.update({
  region: "us-west-2",
  // endpoint: "http://localhost:8000",
    accessKeyId:"AKIAJAXEV6JVRBRVHCFA",
    secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamoConnection : dynamodb,
    docClient : docClient
};