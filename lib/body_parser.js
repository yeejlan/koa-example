var co_body = require('co-body');

module.exports = function(){

	return function *(next){
		var body = {};

		if(this.is('application/json')){
		  body = yield co_body.json(this);
		}else if(this.is('application/x-www-form-urlencoded')){
		  body = yield co_body.form(this);
		}

		this.request.body = body;

		yield *next;
	};
};