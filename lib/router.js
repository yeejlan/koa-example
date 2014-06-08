
var fs = require('fs'),
	path = require('path');

var actions = {};

/**
 * a middleware which dispatch actions
 *
 * @param {function} next
 * @api public
**/
exports.dispatch = function *(next) {

	var paths = this.path.split('/');
	var controller = paths[1];
	var action = paths[2];
	
	if(!controller) controller = 'home';
	if(!action) action = 'index';
	if(actions[controller] && actions[controller][action]){
		var fn = actions[controller][action];
		yield fn.apply(this);
	}
	
	yield *next;
}



/**
 * load actions under {basedir} to this.actions
 *
 * @param {string} basedir
 * @api public
**/
exports.loadActions = function(basedir) {
	fs.readdirSync(basedir).forEach(function(filename){
		if (!/\.js$/.test(filename)) return;
		var name = path.basename(filename, '.js');
		var lowerName = name.toLowerCase();

		var controller = require(basedir + '/' + name);
			actions[lowerName] = {};
		for(var action in controller.actions){
			var lowerAction = action.toLowerCase();
			actions[lowerName][lowerAction] = controller.actions[action];
		}
	});
}

