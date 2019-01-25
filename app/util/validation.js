const validation = {};

validation.parseValidationErrors = function (errors) {
    let errorObject = {};

    Object.keys(errors).forEach(function (value) {
        errorObject[value] = errors[value].msg;
    });

    return errorObject;
};

module.exports = validation;