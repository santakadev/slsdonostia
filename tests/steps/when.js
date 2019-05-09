const http = require("superagent-promise")(require("superagent"), Promise);

const viaHandler = async function(name, event) {
    const handler = require(`../../src/functions/${name}`)
    const response = await handler.handler(event);
    response.body = JSON.parse(response.body);
    return response;
}

const viaHttp = async function(functionPath) {
    const apiRoot = "https://k80wvhzlna.execute-api.eu-west-1.amazonaws.com/dev/api";
    const method = "GET";

    const url = `${apiRoot}/${functionPath}`;

    console.log(url);

    try {
        const httpReq = http(method, url);
        const res = await httpReq;

        return {
            statusCode: res.status,
            body: res.body
        };
    } catch (err) {
        if (err.status) {
            return {
                statusCode: err.status
            };
        }
        throw err;
}
}

module.exports.we_invoke_helloWorld = (name) => {
    const event = { pathParameters: { name: name } };

    return process.env.TEST_MODE === 'http' ?
        viaHttp(`helloWorld/${name}`) :
        viaHandler('helloWorld', event);
}
