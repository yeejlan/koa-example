var actions = module.exports.actions = {}

actions.set = function *(){
	var age = 18;
	console.log(this.subdomains);
	this.cookies.set('age', age);
	this.body = 'Set cookie age =' + 18;
}

actions.get = function *(){
	this.body = 'Get cookie age =' + this.cookies.get('age');
}