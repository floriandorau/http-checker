const fs = require('fs');
const YAML = require('yaml');
const { join } = require('path');
const { homedir } = require('os');

const CONFIG_FOLDER = '.http-checker';
const CONFIG_FILE_NAME = 'config.yml';

const throwConfigError = function (name) {
    throw Error(`No value set for '${name}' in config.yml`);
};

const readConfigFile = function (path) {
    const file = fs.readFileSync(path, 'utf8');
    return YAML.parse(file);
};

const readConfig = function () {
    const configPath = join(homedir(), CONFIG_FOLDER, CONFIG_FILE_NAME);

    if (!fs.existsSync(configPath)) {
        throw new Error('No config.yml found. Please make sure that you have a valid config at ' + configPath);
    }

    const config = readConfigFile(configPath);
    return Object.assign({}, {
        endpoints: config.endpoints || throwConfigError('endpoints'),
        interval: config.interval || throwConfigError('interval'),
    });
};


module.exports = { readConfig };