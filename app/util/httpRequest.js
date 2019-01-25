const constant    = require(__basePath + '/app/config/constant');
const response    = require(constant.path.app + 'util/response');
const request     = require('request');
const underscore  = require('underscore');
const httpRequest = {};

/*
 * http external call (GET|POST)
 * @param string method
 * @param string url
 * @param {object} headers
 * @param {object} params
 * @param int timeout
 * @param {object} callback
 * @returns {callback}
 */
httpRequest.call = function (method = 'GET', url, headers = {}, params = {}, options = {}, callback) {
    if (underscore.isEmpty(url) == true) {
        return callback('Url is required!');
    }

    if (headers.length == false) {
        headers = {
            "Content-Type": "application/json; charset=utf-8"
        };
    }

    const requestOptions = {
        url    : url,
        method : method,
        headers: headers,
        json   : true,
        body   : underscore.isEmpty(options.type) || options.type === 'json' ? params : null,
        form   : options.type && options.type === 'form' ? params : null,
        timeout: options.timeout || 120000
    };

    return request(requestOptions, callback);
};

httpRequest.callUploadFile = function (method = 'POST', url, headers = {}, formData = {}, options = {}, callback) {
    if (url.length == false) {
        return callback('Url is required!');
    }

    if (headers.length == false) {
        headers = {
            "Content-Type": "multipart/form-data"
        };
    }


    const requestOptions = {
        url     : url,
        method  : method,
        headers : headers,
        json    : true,
        formData: formData, //JSON.stringify(params),
        timeout : options.timeout || 60000
    };

    return request(requestOptions, callback);
};

module.exports = httpRequest;
