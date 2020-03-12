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

const executeRequest = async function (url, { username, password }) {
    try {
        const options = (username && password) ? { username, password } : {};
        const response = await got(url, options);
        logResponse(response);
    } catch (err) {
        logError(err);
    }
};

const run = async function () {
    const { interval, endpoints } = config;
    for (const { url, username, password } of endpoints) {
        console.log(`Executing request against ${url} every ${interval}s`);
        setInterval(() => executeRequest(url, { username, password }), interval * 1000);
    }
};

module.exports = { run };