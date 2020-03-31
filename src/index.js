const got = require('got');
const { inspect } = require('util');

const { sleep } = require('./util');
const { createLogger } = require('./logger');
const { sendMessage, sendErrorMessage } = require('./slack');

const config = require('./config').readConfig();

const createLogMessage = function (url, { statusCode, statusMessage, body, ip, headers }) {
    if (statusCode >= 300) {
        return `Http status ${statusCode} [${statusMessage}] from ${ip} [${url}]
        ${inspect(headers)}

        ${body}`;
    } else {
        return `Http status ${statusCode} [${statusMessage}] from ${ip} [${url}]`;
    }
};

const executeRequest = async function (url, { username, password }, logger) {
    let response;
    try {
        const options = (username && password) ? { username, password } : {};
        response = await got(url, { ...options, throwHttpErrors: false });

        logger.info(createLogMessage(url, response));
        if (response.statusCode >= 300) {
            sendMessage(url, response);
        }
    } catch (err) {
        logger.error(`Error while checking url '${url}': ${err.name} [${err.message}}`);
        sendErrorMessage(url, err);
    }
};

const scheduleRequestExecution = function ({ url, username, password }, interval) {
    const [domain,] = new URL(url).hostname.split('.');
    const logger = createLogger(domain);

    logger.info(`Executing request against ${url} with interval of ${interval} s`);
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

        // Schedule execution of different endpoints with a delay
        await sleep(config.delay * 1000);
    }
};

module.exports = { run };