const got = require('got');
const { inspect } = require('util');

const { getIsoDateString } = require('./util');
const config = require('./config').readConfig();

const createMessage = function (url, { statusCode, statusMessage, body, ip, headers }) {
    return `${getIsoDateString()} - Status: ${statusCode} [${statusMessage}] for ${ip} [${url}]
    
    ${body}
    
    ${inspect(headers)}`;
};

const createErrorMessage = function (url, error) {
    return `${getIsoDateString()} - Error: ${error.name} [${error.message}] [${url}]
    ${error.stack}`;
};

const postMessage = function (message) {
    return got.post(config.slack.webhook, {
        headers: {
            'Content-type': 'application/json; charset=utf-8',
        },
        json: {
            channel: config.slack.channel,
            as_user: 'true',
            type: 'mrkdwn',
            text: '```' + message + '```'
        }
    }).catch(err => console.error('Error sending message to slack', err));
};

const sendMessage = async function (url, httpResponse) {
    return postMessage(createMessage(url, httpResponse));
};

const sendErrorMessage = async function (url, error) {
    return postMessage(createErrorMessage(url, error));
};

module.exports = { sendMessage, sendErrorMessage };