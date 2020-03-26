const got = require('got');

const { sleep } = require('./util');
const { sendMessage } = require('./slack');
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

        logger.info(createLogMessage(response));
        if (response.statusCode >= 300) {
            sendMessage(response);
        }
    } catch (err) {
        logger.error('', err);
    }
};

const scheduleRequestExecution = function ({ url, username, password }, interval) {
    const [domain,] = new URL(url).hostname.split('.');
    const logger = createLogger(domain);

    logger.info(`Executing request against ${url} with interval of ${interval}s`);
    executeRequest(url, { username, password }, logger);
    setInterval(() => executeRequest(url, { username, password }, logger), interval * 1000);
};

const run = async function () {
    const { interval, endpoints } = config;

    if (!Array.isArray(endpoints)) {
        throw new Error('expected endpoints to be list');
    }

    for (const endpoint of endpoints) {
        scheduleRequestExecution(endpoint, interval);
        // Schedule endpoint execution with a little delay
        sleep(config.delay * 1000);
    }
};

module.exports = { run };