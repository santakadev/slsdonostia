const viaHandler = async function(name, event) {
    const handler = require(`../../src/functions/${name}`)
    const response = await handler.handler(event);
    response.body = JSON.parse(response.body);
    return response;
}

module.exports.we_invoke_helloWorld = (name) => {
    const event = { pathParameters: { name: name } };
    return viaHandler('helloWorld', event);
}