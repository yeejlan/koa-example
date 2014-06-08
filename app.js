
"use strict"

var path = require('path');
var koa = require('koa');
var app = koa();

var config = require('./lib/config');
var router = require('./lib/router');

/**load config**/
global.g_config = config.load(path.join(__dirname, 'config', app.env));

/**load and dispatch actions**/
router.loadActions(path.join(__dirname, 'controllers'));
app.use(router.dispatch);

console.log(app);

app.listen(3000);

console.log('listen on 3000');