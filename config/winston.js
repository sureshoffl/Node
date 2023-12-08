const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // Console transport for logging to the console
    new winston.transports.Console(),
    // File transport for logging to a file
    new winston.transports.File({ filename: 'logfile.log' })
  ]
});

// Log some messages at different levels
logger.log('info', 'This is an informational message.');
logger.log('warn', 'This is a warning message.');
logger.log('error', 'This is an error message.');

// Using the logger's level-specific methods
logger.info('Another informational message.');
logger.warn('Another warning message.');
logger.error('Another error message.');