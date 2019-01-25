const constant    = require(__basePath + '/app/config/constant');
const httpRequest = require(constant.path.app + 'util/httpRequest');
const utility     = require(constant.path.app + 'util/utility');
const underscore  = require('underscore');
const {logger}    = require(constant.path.app + 'core/logger');

class BaseModel {

    sendRequest(method, url, headers, params, options, callback) {

        //Adding additional headers
        underscore.extend(headers, {
            requestId: utility.uuid()
        });

        return httpRequest.call(
            method,
            url,
            headers,
            params,
            options,
            function (error, result, body) {
                if (error) {
                    logger.error("Error while calling URL: " + url);
                    logger.error(error);
                }

                return utility.isEmpty(result) === false ? callback(error, result, body) : callback(error, {}, {});
            }
        );
    }
}

module.exports = BaseModel;