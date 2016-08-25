/* jshint node:true */
// https://www.npmjs.com/package/gulp-nginclude
// Modified for themes use

'use strict';

var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var glob = require('glob');
var gutil = require('gulp-util');
var through = require('through2');
var extend = require('util')._extend;
var PluginError = gutil.PluginError;

module.exports = function(options) {
    options = extend({trim: true}, options);

    function transform(file, encoding, next) {
        var cwd = process.cwd();

        if (file.isNull()) {
            return next(null, file); // pass along
        }

        var $ = cheerio.load(file.contents.toString('utf8'), {decodeEntities: false});

        // This function receives an ng-include src and tries to read it from the filesystem
        function readSource(src) {
            if (options.assetsDirs && options.assetsDirs.length) {
                var srcTheme = path.join(options.assetsDirs[0], src);
                var match = glob.sync(srcTheme, {cwd: cwd});
                if (!match.length) {
                    srcTheme = path.join(options.assetsDirs[1], src);
                    match = glob.sync(srcTheme, {cwd: cwd});
                }
            }

            if (!match.length) return next(new PluginError('gulp-nginclude', 'File "' + srcTheme + '" not found'));
            return fs.readFileSync(path.join(cwd, match[0])).toString();
        }

        function processTag(i, ng) {
            var $ng = $(ng);
            var src = $ng.attr('src') || $ng.attr('ng-include');

            // Remove old ng-include attributes so Angular doesn't read them
            $ng.removeAttr('src').removeAttr('ng-include');

            var before = '\n<!-- ngInclude: ' + src + ' -->\n';
            var after = '\n<!--/ngInclude: ' + src + ' -->\n';
            var include = readSource(src);
            if (options.trim && include) {
                include = include.trim();
            }
            $ng.html(before + include + after);
            return true;
        }

        // Use while to make the task recursive
        while (true) {
            var tags = $('[ng-include]');

            // If we don't find any more ng-include tags, we're done
            if (tags.length === 0) {
                file.contents = new Buffer($.html());
                return next(null, file);
            }

            // For each tag, grab the associated source file and sub it in
            var results = [];
            /* jshint validthis:true*/
            tags.each(function() {
                results.push(processTag.apply(null, arguments));
            });

            // If we don't find any more suitable ng-include tags
            if (results.filter(Boolean).length === 0) {
                file.contents = new Buffer($.html());
                return next(null, file);
            }

        }

    }

    return through.obj(transform);
};