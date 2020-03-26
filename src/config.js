const fs = require('fs');
const YAML = require('yaml');
const { join } = require('path');
const { homedir } = require('os');

const APP_DIR = '.http-checker';
const CONFIG_FILE_NAME = 'config.yml';
const APP_PATH = join(homedir(), APP_DIR);

const throwConfigError = function (name) {
    throw Error(`No value set for '${name}' in config.yml`);
};

const getLogPath = function () {
    return join(APP_PATH, 'logs');
};

const readConfigFile = function (path) {
    const file = fs.readFileSync(path, 'utf8');
    return YAML.parse(file);
};

const readConfig = function () {
    const configPath = join(APP_PATH, CONFIG_FILE_NAME);

    if (!fs.existsSync(configPath)) {
        throw new Error('No config.yml found. Please make sure that you have a valid config at ' + configPath);
    }

    const config = readConfigFile(configPath);
    return Object.assign({}, {
        slack: config.slack || throwConfigError('slack'),
        endpoints: config.endpoints || throwConfigError('endpoints'),
        interval: config.interval || 10,
        delay: config.delay || 5
    });
};

module.exports = { readConfig, getLogPath };