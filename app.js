
"use strict"

var path = require('path');
var koa = require('koa');
var app = koa();

var config = require('./lib/config');
var router = require('./lib/router');

//load config
global.g_config = config.load(path.join(__dirname, 'config', app.env));

//add data object/namespace to context
app.use(function *(next){
	this.data = {};
	yield *next;	
});

//load actions and dispatch
router.loadActions(path.join(__dirname, 'controllers'));
app.use(router.dispatch);


var port = 3000;
app.listen(port);

console.log('listen on ' + port);