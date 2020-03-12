const got = require('got');

const config = require('./config').readConfig();

const logResponse = function ({ statusCode, statusMessage, body, ip, headers }) {
    const ts = new Date().toISOString();

    console.log(`${ts} - Http status ${statusCode} [${statusMessage}] from ${ip} at ${headers.date}`);

    if (statusCode >= 300) {
        console.log(ts, headers);
        console.log(ts, body);
    }
};

const logError = function (error) {
    const ts = new Date().toISOString();
    console.error(ts, error);
};

const executeRequest = async function (url, username, password) {
    try {
        const response = await got(url, { username, password });
        logResponse(response);
    } catch (err) {
        logError(err);
    }
};

const run = async function () {
    const { interval, endpoints } = config;
    for (const endpoint of endpoints) {
        console.log(`Executing request against ${endpoint.url} every ${interval}s`);
        setInterval(() => executeRequest(endpoint.url, endpoint.username, endpoint.password), interval * 1000);
    }
};

run();