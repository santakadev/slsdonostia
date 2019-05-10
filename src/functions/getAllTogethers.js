const AWS = require("aws-sdk");
const middy = require('middy')
const { ssm } = require('middy/middlewares')

const dynamodb = new AWS.DynamoDB.DocumentClient();

const handler = async (event, context) => {

    console.log(event)
    
    const req = {
        TableName: context.tableName,
        Limit: 8
    }

    const resp = await dynamodb.scan(req).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(resp.Items)
    };

    return response;
}

module.exports.handler = middy(handler).use(
    ssm({
        cache: true,
        cacheExpiryInMillis: 3 * 60 * 1000,
        setToContext: true,
        names: {
            tableName: `${process.env.getTogethersTableName}`
        }
    })
)