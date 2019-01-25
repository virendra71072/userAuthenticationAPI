const constant   = require(__basePath + 'app/config/constant');
const underscore = require('underscore');
const uuIdv4     = require('uuid/v4');
const moment     = require('moment');
const {logger}   = require(constant.path.app + 'core/logger');
const crypto     = require('crypto');

const utility = {};

/**
 * Generate a valid V4 UUID
 * @return string
 */
utility.uuid = function () {
    return uuIdv4();
};

/**
 * check string is valid or return default value
 * @param {string} value
 * @param {string} defaultValue
 *
 * @return string
 */
utility.validOrDefault = function (value, defaultValue = '') {
    return (utility.isEmpty(value) === false) ? value : defaultValue;
};

/**
 * Generate Otp
 *
 * @return int
 */
utility.generateOtp = function () {
    return underscore.random(100000, 999999);
};

/**
 * Generate Randan Password
 *
 * @return int
 */
utility.generatePassword = function () {
    return Math.random().toString(36).slice(-8);
};

/**
 * convert string into MD5
 *
 * @return int
 */
utility.md5 = function (string) {
    return crypto.createHash('md5').update(string).digest('hex')
};

/**
 * Check any object, array, string, number, boolean is empty or not.
 *
 * @param obj
 * @return {boolean}
 */
utility.isEmpty = function (obj) {
    if (underscore.isNumber(obj) || underscore.isBoolean(obj)) {
        return false;
    }

    return underscore.isEmpty(obj);
};

/**
 * check variable is exit or not
 *
 * @return boolean
 */
utility.isset = function (params) {
    return typeof params !== 'undefined';
};

/**
 * validate Email
 *
 * @return boolean
 */
utility.validateEmail = function (email) {

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    
    if (reg.test(email) == false) 
    {
        return false;
    } else {
        return true;
    }
}

/**
 * get date different in (Years/months/days)
 *
 * @return number
 * @param date1
 * @param date2
 * @param differentFormat
 */
utility.dateDifference = function (date1, date2 = new Date(), differentFormat = 'years') {
    let startDate = moment(date1).format('YYYY-MM-DD');
    let endDate   = moment(new Date()).format("YYYY-MM-DD");

    return moment(endDate).diff(startDate, differentFormat);
};

/**
 * get time different in (days/hours/minutes/second)
 *
 * @return number
 * @param date1
 * @param date2
 * @param differentFormat
 */
utility.timeDifference = function (date1, date2 = new Date(), differentFormat = 'hours') {
    var startDate = moment(date1, 'YYYY-M-DD HH:mm:ss');
    var endDate = moment(date2, 'YYYY-M-DD HH:mm:ss');

    return endDate.diff(startDate, 'hours');
};

utility.encryptString = function (plaintext, secretKey, iv) {
    let padding = 16 - (plaintext.length % 16);
    plaintext   = plaintext + "_".repeat(padding);

    let cipher = crypto.createCipheriv('aes-128-cbc', secretKey, new Buffer(iv));
    return cipher.update(plaintext, 'utf8', 'base64') + cipher.final('base64');
};

utility.decryptString = function (plaintext, secretKey, iv) {

    let decipher = crypto.createDecipheriv('aes-128-cbc', secretKey, iv);
    decipher.setAutoPadding(false);
    return decipher.update(plaintext, 'base64', 'utf8');
};

module.exports = utility;
