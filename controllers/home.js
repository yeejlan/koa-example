var actions = module.exports.actions = {}

//website entrance
actions.index = function *(){
	this.body = 'Hello World';
}

//say hello
actions.hello = function *(){
	var name = this.query.name || 'world';
	this.body = 'Hello ' + name;
}

//dump context object
actions.context = function *() {
	var self = this;
	var capture = require('../utils/capture').capture_stdout;
	var output = capture(function(){
		console.log(self);
	});

	this.body = output;
}

//get form post data
actions.post = function *() {
	var self = this;
	var body = require('../utils/body');
	
	var form = yield body.form(self);
	this.body = form;	
}

//get raw post data
actions.rawPost = function *() {
	var self = this;
	var body = require('../utils/body');
	
	var raw = yield body.raw(self);
	this.body = raw;
}
