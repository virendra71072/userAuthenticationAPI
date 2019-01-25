const constant  = require(__basePath + 'app/config/constant');
const router    = require('express').Router({
    caseSensitive   : true,
    strict          : true
});

const userAssembly   = require(constant.path.module + 'assembly/user/userAssembly');
const validation    = require(constant.path.module + 'assembly/user/userValidation');


/*
 * Router list
 */
 /* Register users */
router.post(
    '/create',
    validation.create,
    userAssembly.create
);

/* login user */
router.post(
    '/login',
    validation.login,
    userAssembly.login
);

/* forgot user password */
router.post(
    '/password.forgot',
    validation.forgot,
    userAssembly.forgot
);

/* reset user password */
router.post(
    '/password.reset',
    validation.reset,
    userAssembly.reset
);

module.exports = {
    router: router
};
