const constant         = require(__basePath + 'app/config/constant');
const validationHelper = require(constant.path.app + 'util/validation');
const responseHelper   = require(constant.path.app + 'util/response');

exports.create = function (req, res, next) {
    let headerSchema = {};

    let schema = {};

    let bodySchema = {
        name   : {
            notEmpty: true
        },
        email: {
            notEmpty: true
        },
        password: {
            notEmpty: true
        },
        confirmPassword: {
            notEmpty: true
        }
    };

    req.checkHeaders(headerSchema);
    req.checkParams(schema);
    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {

        // Checking for validation errors
        if (false === result.isEmpty()) {
            return res.status(400).json(responseHelper.build(
                'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
            )).end();
        }

        next();
    });
};

exports.login = function (req, res, next) {
    let headerSchema = {};

    let schema = {};

    let bodySchema = {
        email   : {
            notEmpty: true
        },
        password: {
            notEmpty: true
        }
    };

    req.checkHeaders(headerSchema);
    req.checkParams(schema);
    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {

        // Checking for validation errors
        if (false === result.isEmpty()) {
            return res.status(400).json(responseHelper.build(
                'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
            )).end();
        }

        next();
    });
};

exports.forgot = function (req, res, next) {
    let headerSchema = {};

    let schema = {};

    let bodySchema = {
        email: {
            notEmpty: true
        }
    };

    req.checkHeaders(headerSchema);
    req.checkParams(schema);
    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {

        // Checking for validation errors
        if (false === result.isEmpty()) {
            return res.status(400).json(responseHelper.build(
                'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
            )).end();
        }

        next();
    });
};

exports.reset = function (req, res, next) {
    let headerSchema = {};

    let schema = {};

    let bodySchema = {
        email: {
            notEmpty: true
        },
        currentPassword: {
            notEmpty: true
        },
        password: {
            notEmpty: true
        },
        confirmPassword: {
            notEmpty: true
        }
    };

    req.checkHeaders(headerSchema);
    req.checkParams(schema);
    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {

        // Checking for validation errors
        if (false === result.isEmpty()) {
            return res.status(400).json(responseHelper.build(
                'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
            )).end();
        }

        next();
    });
};
