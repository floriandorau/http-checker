const config = require('./config');
const fs = require('fse');
const { join } = require('path');
const { createSimpleLogger } = require('simple-node-logger');

const createIfNotExist = function (path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    return path;
};

class Logger {
    constructor(logFilePath) {
        this.logger = createSimpleLogger({
            logFilePath,
            timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
        });
    }

    info(msg) {
        this.logger.info(msg);
    }

    error(msg, err) {
        this.logger.error(msg, err);
    }
}

const currentTimestampString = function () {
    // Creates a string in format 2020-01-01T01-01-01"
    return new Date().toJSON().split('.')[0].replace(/:/gi, '-');
};

const createLogger = function (name) {
    const logsFolder = createIfNotExist(config.getLogPath());
    const logFileFolder = createIfNotExist(join(logsFolder, name));

    let logFileName = join(logFileFolder, `${name}-${currentTimestampString()}.log`);
    logFileName = fs.writeFileSync(logFileName);
    return new Logger(logFileName);
};

module.exports = { createLogger };