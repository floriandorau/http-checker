const got = require('got');

const { createLogger } = require('./logger');
const config = require('./config').readConfig();

const createLogMessage = function ({ statusCode, statusMessage, body, ip, headers }) {
    if (statusCode >= 300) {
        return `Http status ${statusCode} [${statusMessage}] from ${ip}
        ${headers}
        ${body}
        `;
    } else {
        return `Http status ${statusCode} [${statusMessage}] from ${ip}`;
    }
};

const executeRequest = async function (url, { username, password }, logger) {
    try {
        const options = (username && password) ? { username, password } : {};
        const response = await got(url, options);
        const message = createLogMessage(response);
        logger.info(message);
    } catch (err) {
        logger.error('', err);
    }
};

const run = async function () {
    const { interval, endpoints } = config;
    for (const { url, username, password } of endpoints) {
        // Create logger forr current endpoint
        const [domain,] = new URL(url).hostname.split('.');
        const logger = createLogger(domain);

        logger.info(`Executing request against ${url} every ${interval}s`);
        executeRequest(url, { username, password }, logger);
        setInterval(() => executeRequest(url, { username, password }, logger), interval * 1000);
    }
};

module.exports = { run };