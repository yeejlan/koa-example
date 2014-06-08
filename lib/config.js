var fs = require('fs'),
	path = require('path'),
	mixin = require('utils-merge'),
	ini = require('ini');

var setting = {}


exports.load = function(configPath) {
	/**load and merge all config file**/
	fs.readdirSync(configPath).forEach(function(filename){
		if (!/\.ini$/.test(filename)) return;
		var config = ini.parse(fs.readFileSync(path.join(configPath, filename), 'utf-8'));
		setting = mixin(setting, config);
	});
	return setting;
}
