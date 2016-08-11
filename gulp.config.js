/*jshint node:true */

var glob = require('glob');

module.exports = function() {
    var src = './src/',
        temp = './tmp/',
        email = './email/',

        base = 'default/',
        theme = 'ultimo/';

    var config = {
        // Themes
        basePath: src + base,
        themePath: src + theme,

        // Reserved and written to in gulpfile.js
        env: '',
        settings: '',

        /************** Paths ****************/
        build: 'dist/',

        // Temp
        temp: temp,

        // Emails
        email: {
            templates: [
                // ignore built files
                email + '*.html',
                '!' + email + '*.inline.html',
            ],
            styles: email + 'css.css',
            dest: email,
        },

        /************** Settings ****************/
        node: {
            port: '8080',
            lrPort: '35729', // not used?
        },
        sassSettings: {
            // Seems to break sourcemaps, so conditionally minify css in gulpfile
            // outputStyle: 'compressed',
            precision: 8,
            // Search imported styles in theme at first and then in base
            includePaths: [src + theme, src + base]
        },
        uglifySettings: {
            mangle: false,
        },
    };

    setConfigPaths();
    return config;

    //////////////////////////////////

    // Fill the config with themes paths
    function setConfigPaths() {
        addThemePaths(config.basePath);
        addThemePaths(config.themePath);

        // Styles root
        var themeStylesRoot = config.themePath + 'app.scss';
        var match = glob.sync(themeStylesRoot);
        config.styles.root = (match.length) ? themeStylesRoot : config.basePath + 'app.scss';

        return config;
    }

    // Adds paths of a single theme to the config
    function addThemePaths(themeDir) {
        // Theme paths pattern
        var themePaths = {
            fonts: themeDir + '_fonts/**/*.{otf,svg,eot,ttf,woff,woff2}',
            html: {
                root: themeDir + '*.html',
                nonRoot: [
                    themeDir + '**/*.html',
                    '!' + themeDir + '*.html',
                ],
            },
            media: [
                // Ignore media, declaring the _images folder directly moves all of its contents
                // without the container folder getting in the way
                themeDir + '_images/**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
                themeDir + '**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
                '!' + themeDir + '_fonts/*',
            ],
            misc: [
                themeDir + '*.{htaccess,ico,xml}',
                themeDir + 'humans.txt'
            ],
            robots: {
                default: themeDir + 'robots.dev.txt',
                prod: themeDir + 'robots.prod.txt',
            },
            styles: {
                all: [
                    themeDir + '**/*.scss',
                    themeDir + '**/*.css',
                ],
            },
            scripts: {
                app: [
                    temp + 'config.js', // this is a built file
                    themeDir + '**/init.js',
                    themeDir + '**/*.js',
                    '!' + themeDir + '_lib/**/*', // don't clobber lib
                ],
                lib: [
                    themeDir + '_lib/jquery.min.js',
                    themeDir + '_lib/angular.min.js',
                    themeDir + '_lib/**/*.min.js',
                ],
            },
        };

        mergeConfigPaths(config, themePaths);
    }

    // Adds to the config new paths
    // iterates over newConfig path keys and adds paths to the current config
    function mergeConfigPaths(currConfig, newConfig) {
        for (var key in newConfig) {
            var newConfigItem = newConfig[key];

            // if there is not such a path key in the current config, create a new one
            if (currConfig[key] == undefined) {
                currConfig[key] = newConfigItem;

            // if there is a single string in the current config,
            // make an array of paths
            } else if (typeof(currConfig[key]) === 'string') {
                currConfig[key] = [currConfig[key], newConfigItem];

            // if it's an array, add new paths to it
            } else if (currConfig[key] instanceof Array) {
                var currConfigItem = currConfig[key],
                    offset = currConfigItem.length / newConfigItem.length;
                // we want to keep a path sequence (e.g. init.js goes first)
                // so we are merging arrays accordingly
                for (var i = 0; i < newConfigItem.length; i++) {
                    currConfigItem.splice(i + offset * i + 1, 0, newConfigItem[i]);
                }
                currConfig[key] = currConfigItem;


            // if it's an object, recursively call mergeConfigPaths
            } else if (typeof(currConfig[key]) === 'object') {
                currConfig[key] = mergeConfigPaths(config[key], newConfigItem);
            }
        }

        return currConfig;
    }
};

