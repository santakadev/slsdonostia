const AWS = require("aws-sdk");

const sns = new AWS.SNS();

exports.handler = async (event) => {

    const body = JSON.parse(event.body)

    const message = {
        "getTogetherId": body.getTogetherId,
        "orderId": body.orderId,
        "userEmail": body.userEmail
    };

    const params = {
        Message: JSON.stringify(message),
        TopicArn: process.env.joinGetTogetherTopicArn
    };

    await sns.publish(params).promise();

    const response = {
        statusCode: 200,
        body: ""
    };

    return response;
}