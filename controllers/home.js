var actions = module.exports.actions = {}

actions.index = function *(){
	this.body = 'Hello World';
}

actions.hello = function *(){
	var name = this.query.name || 'world';
	this.body = 'Hello ' + name;
}