var co_body = require('co-body');

//raw post data
exports.raw = function(req, opts){
	var _raw = require('raw-body');
	req = req.req || req;
	opts = opts || {};

	// defaults
	var len = req.headers['content-length'];
	if (len) opts.length = ~~len;
	opts.encoding = opts.encoding || 'utf8';
	opts.limit = opts.limit || '5mb';

	return function(done){
		_raw(req, opts, function(err, str){
			if (err) {
				done(err);
			}
			done(null, str);
		});
	}
};

//application/json
exports.json = function(req, opts){
	req = req.req || req;
	opts = opts || {};

	return co_body.json(req, opts);
}

//application/x-www-form-urlencoded
exports.form = function(req, opts){
	req = req.req || req;
	opts = opts || {};

	return co_body.form(req, opts);
}