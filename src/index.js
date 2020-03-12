const got = require('got');
const { green, red, cyan } = require('chalk');

const config = require('./config').readConfig();

const logResponse = function ({ statusCode, statusMessage, body, ip, headers }) {
    const ts = cyan(new Date().toISOString());

    if (statusCode >= 300) {
        console.log(`${ts} - Http status ${red(statusCode)} [${red(statusMessage)}] from ${ip} at ${headers.date}`);
        console.log(ts, headers);
        console.log(ts, body);
    } else {
        console.log(`${ts} - Http status ${green(statusCode)} [${green(statusMessage)}] from ${ip} at ${headers.date}`);
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