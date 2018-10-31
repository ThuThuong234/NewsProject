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
  accessKeyId:"AKIAJP4UK6UXIRZ5W2MA",
  secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamoConnection : dynamodb,
    docClient : docClient
};