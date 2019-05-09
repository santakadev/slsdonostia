exports.handler = async (event) => {
    const { name } = event.queryStringParameters;

    const response = {
        statusCode: 200,
        body: JSON.stringify(`Hello ${name}`)
    };

    return response;
}