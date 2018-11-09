var AWSConnect = require("../connectAWS/ConnectAWS");
var dynamodb = AWSConnect.dynamoConnection;

var params = {
    TableName: "Comments",
    KeySchema: [
        { AttributeName: "email", KeyType: "HASH"},
        { AttributeName: "comments_content", KeyType: "RANGE"}
    ],
    AttributeDefinitions : [
        {AttributeName:"email", AttributeType:"S"},
        {AttributeName:"news_id", AttributeType:"S"}
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