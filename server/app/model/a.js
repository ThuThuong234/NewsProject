// var AWS = require("aws-sdk");
// AWS.config.update({
//     region: "us-west-2",
//     endpoint: "http://localhost:8000",
//     accessKeyId:"AKIAJXJOFPZJY2MDQHEA",
//     secretAccessKey: "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"
// });
// var dynamodb = new AWS.DynamoDB();


var AWSConnect = require("../connectAWS/ConnectAWS");
var docClient = AWSConnect.docClient;

// var params = {
//     TableName: 'Feedbacks',
//     ProjectionExpression:"#feedback_id",
//     KeyConditionExpression: "#feedback_id = :feedback_id",
//     ExpressionAttributeNames:{
//         "#feedback_id": "feedback_id"
//     },
//     ExpressionAttributeValues: {
//         ":feedback_id": 20
//     }
//
// };
// docClient.query(params, onScan);
// function onScan(err,data ) {
//     if (err) {
//         console.error("dataUnable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log(data);
//
//         return;
//     }
// }

// var params = {
//     TableName : "Feedbacks"
// };
//
// dynamodb.deleteTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });

var params = {
    TableName : "News"
};

docClient.scan(params, function(err, data) {
    if (err) {
        console.error("Unable to get table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Get table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

