const constant = require(__basePath + 'app/config/constant');
const config   = require(constant.path.app + 'core/configuration');
const winston  = require('winston');
const moment   = require('moment');
const nodeEnv  = process.env.NODE_ENV || 'development';

const logger = new (winston.Logger)({
    emitErrs  : false,
    transports: [
        new winston.transports.Console({
            level          : config.get('logging:consoleLevel'),
            label          : config.get('logging:label'),
            handleException: true,
            json           : false,
            colorize       : true,
            formatter      : function (options) {
                return "[" + moment().format('YYYY-MM-DD hh:mm:ss') + "] " +
                    options.label + "." + options.level.toUpperCase() + ": " + (options.message ?
                                                                                options.message :
                                                                                '') +
                    (options.meta && Object.keys(options.meta).length ?
                     '\n' + JSON.stringify(options.meta, null, 4) :
                     '');
            }
        }),

        new (winston.transports.File)({
            level          : config.get('logging:fileLevel'),
            label          : config.get('logging:label'),
            name           : 'log_file',
            filename       : constant.path.log + nodeEnv + '-' + moment().format('YYYY_MM_DD') + '.log',
            handleException: true,
            json           : false,
            maxSize        : 52428800,
            maxFiles       : 10,
            prettyPrint    : true,
            formatter      : function (options) {
                return "[" + moment().format('YYYY-MM-DD hh:mm:ss') + "] " +
                    options.label + "." + options.level.toUpperCase() + ": " + (options.message ?
                                                                                options.message :
                                                                                '') +
                    (options.meta && Object.keys(options.meta).length ?
                     '\n' + JSON.stringify(options.meta, null, 4) :
                     '');
            }
        })
    ]
});


const databaseLogger = new (winston.Logger)({
    emitErrs  : false,
    transports: [
        new (winston.transports.File)({
            level          : config.get('logging:fileLevel'),
            label          : config.get('logging:label'),
            name           : 'error_file',
            filename       : constant.path.log + nodeEnv + '-' + moment().format('YYYY_MM_DD') + '.database.error.log',
            handleException: true,
            json           : false,
            maxSize        : 52428800,
            maxFiles       : 10,
            prettyPrint    : true,
            formatter      : function (options) {
                return "[" + moment().format('YYYY-MM-DD hh:mm:ss') + "] " +
                    options.label + "." + options.level.toUpperCase() + ": " + (options.message ?
                                                                                options.message :
                                                                                '') +
                    (options.meta && Object.keys(options.meta).length ?
                     '\n' + JSON.stringify(options.meta, null, 4) :
                     '');
            }
        })
    ]
});


/** Return Logger instances */
module.exports = {
    logger  : logger,
    database: databaseLogger
};
