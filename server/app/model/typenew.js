var AWSConnect = require("../connectAWS/ConnectAWS");
var dynamodb = AWSConnect.dynamoConnection;

var params = {
    TableName: "TypeNew",
    KeySchema: [
        { AttributeName: "type_id", KeyType: "HASH"},
        { AttributeName: "typename", KeyType: "RANGE"}
    ],
    AttributeDefinitions : [
        {AttributeName:"type_id", AttributeType:"N"},
        {AttributeName:"typename", AttributeType:"S"}
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