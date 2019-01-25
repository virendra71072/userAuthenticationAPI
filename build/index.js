global.__basePath = process.cwd() + '/';
const app         = require(__basePath + 'app/app.js');
const config      = require(__basePath + 'app/core/configuration');
const port        = config.get('server:index:port');

app.listen(port, function () {
    console.log(`Listening port ${port}`);
});
