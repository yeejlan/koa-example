var co_body = require('co-body');

/**
 * Retrun a thunk which gets raw post data as binary
 *
 * @param {context.request} req
 * @param {object} opts
 * @return {thunk function} 
 * @api public
**/
var raw = exports.raw = function(req, opts){
	var _raw = require('raw-body');
	req = req.req || req;
	opts = opts || {};

	// defaults
	var len = req.headers['content-length'];
	if (len) opts.length = ~~len;
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

/**
 * Retrun a thunk which gets raw post data as utf8 encoded string
 *
 * @param {context.request} req
 * @param {object} opts
 * @return {thunk function} 
 * @api public
**/
exports.rawString = function(req, opts){
	opts = opts || {};
	opts.encoding = opts.encoding || 'utf8';
	return raw(req, opts);
};

/**
 * Retrun a thunk which parses json data
 *
 * @param {context.request} req
 * @param {object} opts
 * @return {thunk function} 
 * @api public
**/
exports.json = function(req, opts){
	req = req.req || req;
	opts = opts || {};

	return co_body.json(req, opts);
}

/**
 * Retrun a thunk which parses application/x-www-form-urlencoded data
 *
 * @param {context.request} req
 * @param {object} opts
 * @return {thunk function} 
 * @api public
**/
exports.form = function(req, opts){
	req = req.req || req;
	opts = opts || {};

	return co_body.form(req, opts);
}