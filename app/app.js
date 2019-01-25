const constant   = require(__basePath + 'app/config/constant');
const app        = require('express')();
const bodyParser = require('body-parser');
const validator  = require('express-validator');
const {logger}   = require(constant.path.app + 'core/logger');
const utility    = require(constant.path.app + 'util/utility');
const config     = require(constant.path.app + 'core/configuration');


//Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Headers: X-Requested-With');
    res.header('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Accept, Origin, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator({}));

var CUSTOM_PARAMETERS = {
    'K8S_NODE_NAME': process.env.K8S_NODE_NAME,
    'K8S_HOST_IP': process.env.K8S_HOST_IP,
    'K8S_POD_NAME': process.env.K8S_POD_NAME,
    'K8S_POD_NAMESPACE': process.env.K8S_POD_NAMESPACE,
    'K8S_POD_IP': process.env.K8S_POD_IP,
    'K8S_POD_SERVICE_ACCOUNT': process.env.K8S_POD_SERVICE_ACCOUNT,
    'K8S_POD_TIER': process.env.K8S_POD_TIER
};

/*
 * Injecting all dependencies
 * Modules + common libs
 */
require(constant.path.app + 'config/dependency')(app);

/*
 * catch 404
 */
app.use(function (req, res) {
    return res.status(400).json({
        status : false,
        message: '404 - Page Not found'
    });
});

/*
 * catch 404 and forward to error handler
 */
app.use(function (err, req, res, next) {
    req.app.get('di').log.logger.error(err.message);

    return res.status(err.status || 500).json({
        status  : false,
        message : err.message,
        code    : err.code,
        response: err.response
    });
});


module.exports = app;
