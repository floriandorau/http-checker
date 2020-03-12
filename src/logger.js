const config = require('./config');
const fs = require('fs');
const { join } = require('path');
const { createSimpleLogger } = require('simple-node-logger');

const createIfNotExist = function (path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    return path;
}

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

const createLogger = function (name) {
    const logsFolder = createIfNotExist(config.getLogPath());
    const logFileFolder = createIfNotExist(join(logsFolder, name));

    const logFileName = join(logFileFolder, `${name}-${new Date().toISOString()}.log`);
    return new Logger(logFileName);
};

module.exports = { createLogger };