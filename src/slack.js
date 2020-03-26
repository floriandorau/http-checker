const got = require('got');
const { inspect } = require('util');

const { getIsoDateString } = require('./util');
const config = require('./config').readConfig();

const createMessage = function ({ statusCode, statusMessage, body, ip, headers }) {
    return `${getIsoDateString()} - Status: ${statusCode} [${statusMessage}] for ${ip}
    
    ${body}
    
    ${inspect(headers)}
    `;
};

const sendMessage = async function (httpResponse) {

    got.post(config.slack.webhook, {
        headers: {
            'Content-type': 'application/json; charset=utf-8',
        },
        json: {
            channel: config.slack.channel,
            as_user: 'true',
            type: 'mrkdwn',
            text: '```' + createMessage(httpResponse) + '```'
        }
    }).catch(err => console.error('Error sending message to slack', err));
};


module.exports = { sendMessage };