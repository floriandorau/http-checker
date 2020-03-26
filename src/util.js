
const getIsoDateString = function () {
    return new Date().toISOString();
};

const currentTimestampString = function () {
    // Creates a string in format 2020-01-01T01-01-01"
    return new Date().toJSON().split('.')[0].replace(/:/gi, '-');
};

const sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = { currentTimestampString, getIsoDateString, sleep };