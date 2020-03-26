const fs = require('fse');
const { join } = require('path');
const { createSimpleLogger } = require('simple-node-logger');

const config = require('./config');
const { currentTimestampString } = require('./util');

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

const createLogger = function (name) {
    const logsFolder = createIfNotExist(config.getLogPath());
    const logFileFolder = createIfNotExist(join(logsFolder, name));

    let logFileName = join(logFileFolder, `${name}-${currentTimestampString()}.log`);
    //logFileName = fs.writeFileSync(logFileName);
    return new Logger(logFileName);
};

module.exports = { createLogger };