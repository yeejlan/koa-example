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