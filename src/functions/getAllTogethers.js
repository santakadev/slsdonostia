const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const req = {
        TableName: process.env.getTogethersTableName,
        Limit: 8
    }

    const resp = await dynamodb.scan(req).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(resp.Items)
    };

    return response;
}