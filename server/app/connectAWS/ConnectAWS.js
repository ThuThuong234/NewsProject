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
  accessKeyId:"AKIAJQ4J2FTY7Y6HBJPA",
  secretAccessKey: "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"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    dynamoConnection : dynamodb,
    docClient : docClient
};