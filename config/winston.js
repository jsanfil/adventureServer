var appRoot = require('app-root-path');
var winston = require('winston');
require('dotenv').config({ path: appRoot+'/.env' });

// define the custom settings for each transport (file, console)
var options = {
  file: {
    level: process.env.LOG_LEVEL_FILE,
    filename: `${appRoot}/logs/server.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: process.env.LOG_LEVEL_CONSOLE,
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.Logger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;