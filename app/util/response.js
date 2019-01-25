const constant = require(__basePath + 'app/config/constant');
const config   = require(constant.path.app + 'core/configuration');
const underscore = require('underscore');
const response = {};

response.build = function (key, response) {
    const responseObj = config.get("APP_MESSAGES:" + key);

    return {
        status       : key === 'SUCCESS',
        statusCode   : (underscore.has(responseObj, 'errorCode') === true)? responseObj.errorCode : 110,
        statusMessage: (underscore.has(responseObj, 'message') === true)? responseObj.message : 'Invalid Request',
        response     : response || {}
    };
};

module.exports = response;
