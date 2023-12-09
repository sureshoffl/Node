const {createLogger, transports, format } = require('winston');

const customlogger = createLogger({
    transports : [
        new transports.File({
            filename : 'custom.log',
            level : 'info',
            format : format.combine(format.timestamp(), format.json())  
        }),
        new transports.File(
            {filename:'combined.error.log', 
             level : 'error',
            format : format.combine(format.timestamp(),format.json())
        })
    ]
})

module.exports = {customlogger}
