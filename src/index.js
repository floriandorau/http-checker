require('dotenv').config();

const got = require('got');

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
    const endpoint = process.env.URL;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const interval = process.env.INTERVAL;

    console.log(`Executing request against ${endpoint} every ${interval}s`);
    setInterval(() => executeRequest(endpoint, username, password), interval * 1000);
};

run();