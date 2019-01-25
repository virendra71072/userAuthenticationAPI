const constant              = require(__basePath + '/app/config/constant');
const response              = require(constant.path.app + 'util/response');
const utility               = require(constant.path.app + 'util/utility');
const config                = require(constant.path.app + 'core/configuration');
const moment                = require('moment');
const async                 = require('async');
const {logger}              = require(constant.path.app + 'core/logger');
const underscore            = require('underscore');
const fs                    = require('fs');
const request               = require('request');
const winston               = require('winston');
const userModel             = require(constant.path.app + 'module/model/database/userModel');

const userModelObj   = new userModel();

/*
 * Register User
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.create = function (req, res, next) {
    let name = utility.validOrDefault(req.body.name, null);
    let email = utility.validOrDefault(req.body.email, null);
    let password = utility.validOrDefault(req.body.password, null);
    let confirmPassword = utility.validOrDefault(req.body.confirmPassword, null);

    logger.info('[create] Register new user with param %s, %s', name, email);

    let validateData = function(callback) {
        if (utility.isEmpty(name) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Name is required!'));
        } else if (utility.isEmpty(email) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Email is required!'));
        } else if (utility.validateEmail(email) === false) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Invalid Email Id!'));
        } else if (utility.isEmpty(password) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Password is required!'));
        } else if (utility.isEmpty(confirmPassword) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Confirm Password is required!'));
        } else if (password != confirmPassword) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Confirm Password is not match with password!'));
        }


        userModelObj.getEmailInfo(email, function (error, result) {
            if (error) {
                return callback(error);
            }
            
            console.log('++++ first ', utility.isEmpty(result));
            if (utility.isEmpty(result) === true) {
                return callback(null, false);
            } else {
                return callback(null, true);
            }
        });
        
    }

    let createUser = function (alreadyEmail, callback) {
        if (alreadyEmail == true) {
            return res.status(500).json(response.build('ERROR_USER_ALREADY_EXISTS', false));
        }

        userModelObj.createUser(name, email, password, function (error, result, body) {
            if (error) {
                return callback(error);
            }

            return callback(null, body);
        });
    }

    async.waterfall([
        validateData,
        createUser
    ], function (error, result, body) {
        if (error) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
        }

        
        logger.info('[createUser] Returned with status [%s].', 200);

        return res.status(200).json(response.build('SUCCESS', true));
    });


};

/*
 * Login check
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.login = function (req, res, next) {
    let email = utility.validOrDefault(req.body.email, null);
    let password = utility.validOrDefault(req.body.password, null);

    logger.info('[login] login user with param %s', email);

    let validateData = function(callback) {
        if (utility.isEmpty(email) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Email is required!'));
        } else if (utility.validateEmail(email) === false) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Invalid Email Id!'));
        } else if (utility.isEmpty(password) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Password is required!'));
        }


        userModelObj.loginCheck(email, password, function (error, result) {
            if (error) {
                return callback(error);
            }
            
            if (utility.isEmpty(result) === true) {
                return callback(null, false);
            } else {
                var info = underscore.first(result);
                
                return callback(null, true, info);
            }
        });
        
    }

    async.waterfall([
        validateData
    ], function (error, result, body) {
        if (error) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
        }
        
        logger.info('[login] Login Returned with status [%s].', 200);

        if (result == false) {
            return res.status(500).json(response.build('INVALID_CREDENTIAL'));   
        }

        return res.status(200).json(response.build('SUCCESS', body));
    });


};


/*
 * Forget Password
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.forgot = function (req, res, next) {
    let email = utility.validOrDefault(req.body.email, null);

    logger.info('[forgot] login user with param %s', email);

    let validateData = function(callback) {
        if (utility.isEmpty(email) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Email is required!'));
        } else if (utility.validateEmail(email) === false) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Invalid Email Id!'));
        }


        userModelObj.getEmailInfo(email, function (error, result) {
            if (error) {
                return callback(error);
            }
            
            if (utility.isEmpty(result) === true) {
                return callback(null, false);
            } else {
                var info = underscore.first(result);
                
                return callback(null, true);
            }
        });
        
    }

    let resetPassword = function (alreadyEmail, callback) {
        if (alreadyEmail == false) {
            return res.status(500).json(response.build('USER_NOT_FOUND', false));
        }

        let generatePassword = utility.generatePassword();

        userModelObj.updateUserPassword(email, generatePassword, function (error, result, body) {
            if (error) {
                return callback(error);
            }

            return callback(null, body);
        });
    }

    async.waterfall([
        validateData,
        resetPassword
    ], function (error, result, body) {
        if (error) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
        }
        
        logger.info('[forgot] Login Returned with status [%s].', 200);
        
        return res.status(200).json(response.build('SUCCESS', 'Random password has been set & sent to you by email. Please use that password to set new password'));
    });


};

/*
 * reset Password
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.reset = function (req, res, next) {
    let email = utility.validOrDefault(req.body.email, null);
    let currentPassword = utility.validOrDefault(req.body.currentPassword, null);
    let password = utility.validOrDefault(req.body.password, null);
    let confirmPassword = utility.validOrDefault(req.body.confirmPassword, null);

    logger.info('[Reset Password] login user with param %s', email);

    let validateData = function(callback) {
        if (utility.isEmpty(email) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Email is required!'));
        } else if (utility.validateEmail(email) === false) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Invalid Email Id!'));
        } else if (utility.isEmpty(currentPassword) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Current Password is required!'));
        } else if (utility.isEmpty(password) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Password is required!'));
        } else if (utility.isEmpty(confirmPassword) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Confirm Password is required!'));
        } else if (password != confirmPassword) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Confirm Password is not match with password!'));
        } else if (password == currentPassword) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Password have not same as current password!'));
        }

        currentPassword = utility.md5(currentPassword);

        userModelObj.getEmailInfo(email, function (error, result) {
            if (error) {
                return callback(error);
            }
            
            if (utility.isEmpty(result) === true) {
                return callback(null, false);
            } else {
                var info = underscore.first(result);

                if (info.password != currentPassword) {
                    return res.status(500).json(response.build('ERROR_VALIDATION', 'Invalid current password!'));
                }
                
                return callback(null, true);
            }
        });
        
    }

    let resetPassword = function (alreadyEmail, callback) {
        if (alreadyEmail == false) {
            return res.status(500).json(response.build('USER_NOT_FOUND', false));
        }

        
        userModelObj.updateUserPassword(email, password, function (error, result, body) {
            if (error) {
                return callback(error);
            }

            return callback(null, body);
        });
    }

    async.waterfall([
        validateData,
        resetPassword
    ], function (error, result, body) {
        if (error) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
        }
        
        logger.info('[Reset Password] Login Returned with status [%s].', 200);
        
        return res.status(200).json(response.build('SUCCESS', true));
    });

};

