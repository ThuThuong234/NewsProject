var AWSConnect = require("../connectAWS/ConnectAWS");
var dynamodb = AWSConnect.dynamoConnection;

var params = {
    TableName: "Feedbacks",
    KeySchema: [
        { AttributeName: "feedback_id", KeyType: "HASH"},
        { AttributeName: "email", KeyType: "RANGE"}
    ],
    AttributeDefinitions : [
        {AttributeName:"feedback_id", AttributeType:"N"},
        {AttributeName:"email", AttributeType:"S"}
    ],
    ProvisionedThroughput:{
        ReadCapacityUnits:10,
        WriteCapacityUnits:10
    }
};

var createTable = dynamodb.createTable(params,function (err, data) {
    if(err)
        console.log("Unable to create table. Error Json: ",JSON.stringify(err,null,2));
    else
        console.log("Created table. Table description Json: ",JSON.stringify(data,null,2));
});

module.exports = {
    createTable : createTable
};