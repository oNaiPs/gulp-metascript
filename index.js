'use strict';

var through = require('through2'),
    meta = require('metascript'),
    PluginError = require('gulp-util/lib/PluginError'),
    pluginName = 'gulp-metascript';

function createError(file, err) {
    if (typeof err === 'string') {
        return new PluginError(pluginName, file.path + ': ' + err, {
            fileName: file.path,
            showStack: false
        });
    }

    var msg = err.message || err.msg || /* istanbul ignore next */ 'unspecified error';

    return new PluginError(pluginName, file.path + ': ' + msg, {
        fileName: file.path,
        lineNumber: err.line,
        stack: err.stack,
        showStack: false
    });
}

module.exports = function (context) {
        function metascript(file, encoding, callback) {
            if (file.isNull()) {
                return callback(null, file);
            }

            if (file.isStream()) {
                return callback(createError(file, 'Streaming not supported'));
            }

            try {
                file.contents = new Buffer(
                    meta.transform(file.contents, file.path, context));
            } catch (err) {
                return callback(createError(file, err));
                }

                return callback(null, file);
            }
            return through.obj(metascript);
        };