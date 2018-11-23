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
    accessKeyId:"AKIAIAGCGVELLYG3K6OQ",
    secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamoConnection : dynamodb,
    docClient : docClient
};