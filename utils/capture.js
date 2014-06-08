
/**
 * pass a function and capture the output of this function
 *
 * @param {function} fn
 * @return {string}
 * @api public
**/
exports.capture_stdout = function(fn) {
    var old_write = process.stdout.write
	var output = '';

    process.stdout.write = (function(write) {
        return function(string, encoding, fd) {
            //write.apply(process.stdout, arguments)
            output += string;
        }
    })(process.stdout.write)
 
    fn();

    process.stdout.write = old_write

    return output;
}
