const constant      = require(__basePath + '/app/config/constant');
const logger        = require(constant.path.app + 'core/logger');
const config        = require(constant.path.app + 'core/configuration');

module.exports = function (app) {
    //Setting dependencies
    app.set('di', {
        constant: constant,
        log     : logger,
        config  : config
    });

    //Application Modules to load
    app.use('/api/v1/user', require(constant.path.module + 'assembly/user').router);
   
};
