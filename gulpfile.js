(function () {
    'use strict';

    var gulp, gutil, minifyHTML, concat, stripDebug, uglify, jshint, changed, imagemin, autoprefix, sass, rjs, minifyCSS,
        browserSync, modRewrite, pngquant, del, paths, host, themes, fs, request, recursive, configs, FOUNDATION_URI,
        THEME_AS_DEFAULT, DEV_FOUNDATION_URI, DEFAULT_ROOT, DEFAULT_PASS;

    gulp = require('gulp');
    gutil = require('gulp-util');
    minifyHTML = require('gulp-minify-html');
    concat = require('gulp-concat');
    stripDebug = require('gulp-strip-debug');
    uglify = require('gulp-uglify');
    jshint = require('gulp-jshint');
    changed = require('gulp-changed');
    imagemin = require('gulp-imagemin');
    autoprefix = require('gulp-autoprefixer');
    sass = require('gulp-sass');
    rjs = require('gulp-requirejs');
    minifyCSS = require('gulp-minify-css');
    browserSync = require('browser-sync');
    modRewrite = require('connect-modrewrite');
    pngquant = require('imagemin-pngquant');
    del = require('del');
    fs = require('fs');
    request = require('request');
    recursive = require('recursive-readdir');
    paths = {
        "app": require('./bower.json').appPath || 'app',
        "dist": 'dist',
        "themes": 'themes',
        "js": ['app/scripts/*.js', 'app/scripts/**/*.js'],
        "vendor": 'app/lib/**/*.js',
        "vendorTheme": 'app/themes/**/lib/**/*',
        "sass": 'app/styles/sass/**/*.scss',
        "css": 'app/themes/**/styles/**/*.css',
        "images": ['app/themes/**/images/**/*', 'app/themes/**/styles/**/*.{png,jpg,jpec,ico}'],
        "fonts": ['app/themes/**/styles/fonts/**/*', 'app/themes/**/fonts/**/*'],
        "html": 'app/**/*.html',
        "misc": 'app/*.{txt,htaccess,ico}',
        "themeDest": "dist/themes",
        "themesDir": "./app/themes"

    };
    host = {
        port: '8080',
        lrPort: '35729'
    };

    /*
     * Get the current environment in use, 'development' is selected by default
     * Set the following environment variables or call directly from the
     * commandline like this:
     *
     *     $ NODE_ENV=staging DEFAULT_ROOT=admin DEFAULT_PASS=admin gulp build
     *
     * NODE_ENV: options are 'development', 'staging', 'production'
     * FOUNDATION_URI: set to the url/port for Foundation
     * DEFAULT_ROOT: set to administrator userid
     * DEFAULT_PASS: set to the administrator password
     * THEME_AS_DEFAULT: set to the desired default theme
     */
    var env = process.env.NODE_ENV || 'development';
    DEFAULT_ROOT = process.env.DEFAULT_ROOT || 'admin';
    DEFAULT_PASS = process.env.DEFAULT_PASS || 'admin';
    THEME_AS_DEFAULT = process.env.THEME_AS_DEFAULT || 'blitz';
    themes = [];

    if (env === 'development') {
        DEV_FOUNDATION_URI = process.env.DEV_FOUNDATION_URI || 'http://localhost:3000';
        FOUNDATION_URI = process.env.FOUNDATION_URI || 'http://dev.ottemo.io:3000';
    } else if (env === 'staging') {
        DEV_FOUNDATION_URI = process.env.DEV_FOUNDATION_URI || 'http://localhost:3000';
        FOUNDATION_URI = process.env.FOUNDATION_URI || 'http://staging.ottemo.io:3000';
    } else if (env === 'wercker') {
        DEV_FOUNDATION_URI = process.env.DEV_FOUNDATION_URI || 'http://localhost:3000';
        FOUNDATION_URI = process.env.FOUNDATION_URI || 'http://dev.ottemo.io:3000';
    } else if (env === 'production') {
        DEV_FOUNDATION_URI = process.env.DEV_FOUNDATION_URI || 'http://localhost:3000';
        FOUNDATION_URI = process.env.FOUNDATION_URI || 'http://dev.ottemo.io:3000';
    }

    gutil.log("Your db settings and your environment settings must match when");
    gutil.log("running 'gulp build' or your templates will be blank.  Example");
    gutil.log("");
    gutil.log("    $ NODE_ENV=development DEFAULT_ROOT=admin DEFAULT_PASS=admin FOUNDATION_URI=http://<server>:<port> gulp build");
    gutil.log("");
    gutil.log("Your current ENV settings are: ");
    gutil.log("");
    gutil.log("NODE_ENV = ", env);
    gutil.log("DEV_FOUNDATION_URI = ", DEV_FOUNDATION_URI);
    gutil.log("FOUNDATION_URI = ", FOUNDATION_URI);
    gutil.log("DEFAULT_ROOT = ", DEFAULT_ROOT);
    gutil.log("DEFAULT_PASS = ", DEFAULT_PASS);
    gutil.log("THEME_AS_DEFAULT = ", THEME_AS_DEFAULT);
    gutil.log("");

    configs = [
        {
            "path": "general.app.foundation_url",
            "value": FOUNDATION_URI,
            "type": "varchar(255)",
            "editor": "text",
            "options": "",
            "label": "Foundation host URL",
            "description": "URL application will use to generate foundation resources links"
        },
        {
            "path": "themes",
            "value": "",
            "type": "group",
            "editor": "",
            "options": "",
            "label": "Themes",
            "description": ""
        },
        {
            "path": "themes.list",
            "value": "",
            "type": "group",
            "editor": "themes_manager",
            "options": "",
            "label": "Themes",
            "description": ""
        },
        {
            "path": "themes.list.active",
            "value": THEME_AS_DEFAULT,
            "type": "",
            "editor": "themes_manager",
            "options": "",
            "label": "Active theme",
            "description": "Active theme on store-ng"
        },
        {
            "path": "general.app.login.facebook.appId",
            "value": "483159925160897",
            "type": "varchar(255)",
            "editor": "text",
            "options": "",
            "label": "Facebook: App ID",
            "description": "Facebook: Application ID"
        },
        {
            "path": "general.app.login.facebook.secretKey",
            "value": "9a362f8b5cd91dbdd908bff472468c7e",
            "type": "varchar(255)",
            "editor": "text",
            "options": "",
            "label": "Facebook: App Secret",
            "description": "Facebook: Application secret key"
        },
        {
            "path": "general.app.login.google.clientId",
            "value": "1074763412644-qq25glj3tb87bq7bk5m8793da11ddheh.apps.googleusercontent.com",
            "type": "varchar(255)",
            "editor": "text",
            "options": "",
            "label": "Google: Client ID",
            "description": ""
        },
        {
            "path": "general.app.category.itemsPerPage",
            "value": 10,
            "type": "int",
            "editor": "text",
            "options": "",
            "label": "Items on page",
            "description": ""
        }
    ];

    var setConfigValue = function (field, path, option) {
        for (var i = 0; i < configs.length; i += 1) {
            if (configs[i].path === path) {
                configs[i][field] = option;
                break;
            }
        }
    };

    var setConfig = function (serverURI, config) {
        request({
            uri: serverURI + '/config/value/' + config.path + '?auth=' + DEFAULT_ROOT + ':' + DEFAULT_PASS,
            method: 'DELETE'
        }, function () {
            var r = request.post(serverURI + '/config/value/' + config.path + '?auth=' + DEFAULT_ROOT + ':' + DEFAULT_PASS);
            var form = r.form();

            form.append('path', config.path);
            form.append('value', config.value);
            form.append('type', config.type);
            form.append('editor', config.editor);
            form.append('options', config.options);
            form.append('label', config.label);
            form.append('description', config.description);
        });
    };

    var initConfigs = function (serverURI) {
        for (var i = 0; i < configs.length; i += 1) {
            setConfig(serverURI, configs[i]);
        }
    };

    // Print a node stack trace upon error
    gulp.on('err', function(e) {
        console.log(e.err.stack);
    });

    // Empties folders to start fresh
    gulp.task('clean', function (cb) {
        del(['dist/*', '!dist/media'], cb);
    });

    // Actions with js-files from theme
    gulp.task('vendorTheme', ['clean'], function () {
        /**
         * Minify and uglify the custom scripts in folder 'scripts' in each theme
         */
        gulp.src('app/themes/**/scripts/**/*.js')
            .pipe(stripDebug())
            .on('error', console.log.bind(console))
            .pipe(uglify({mangle: false}))
            .pipe(gulp.dest(paths.themeDest));

        /**
         * copy vendor js from theme folder
         */
        return gulp.src(paths.vendorTheme)
            .pipe(gulp.dest(paths.themeDest));
    });

    // copy vendor js
    gulp.task('vendor', ['clean', 'vendorTheme'], function () {
        return gulp.src(paths.vendor)
            .pipe(gulp.dest(paths.dist + '/lib'));
    });

    // copy misc assets
    gulp.task('misc', ['clean'], function () {
        return gulp.src(paths.misc)
            .pipe(gulp.dest(paths.dist));
    });

    // Run JSHint
    gulp.task('jshint', function () {
        gulp.src(paths.js)
            .pipe(jshint())
            .pipe(jshint.reporter(require('jshint-stylish')));
    });

    gulp.task('requirejs', ['clean', 'jshint'], function () {
        rjs({
            out: 'main.js',
            name: 'main',
            preserveLicenseComments: false, // remove all comments
            removeCombined: true,
            baseUrl: paths.app + '/scripts',
            mainConfigFile: 'app/scripts/main.js',
            "paths": {
                // Don't attempt to include dependencies whose path begins with webapp/
                "config": "config"
            },
            "shim": {
                "config": {exports: "config"}
            }
        })
            .pipe(stripDebug())
            .on('error', console.error.bind(console))
            .pipe(uglify({mangle: false}))
            .pipe(gulp.dest(paths.dist + '/scripts/'));
    });

    // Sass task, will run when any SCSS files change & BrowserSync
    // will auto-update browsers
    gulp.task('sass', function () {
        return gulp.src(paths.sass)
            .pipe(sass({imagePath: '../../images'}))
            .pipe(autoprefix('last 1 version'))
            .pipe(gulp.dest(paths.dist + '/styles'))
            .pipe(gulp.dest(paths.app + '/styles'));
    });

    // minify new images
    gulp.task('imagemin', ['clean'], function () {
        return gulp.src(paths.images)
            .pipe(changed(paths.themeDest))
            .pipe(imagemin())
            .pipe(gulp.dest(paths.themeDest));
    });

    // minify new or changed HTML pages
    gulp.task('html', ['clean'], function () {
        return gulp.src(paths.html)
            .pipe(changed(paths.dist))
            .pipe(minifyHTML({
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeCommentsFromCDATA: true,
                removeOptionalTags: true,
                conditionals: true,
                quotes: true,
                empty: true
            }))
            .pipe(gulp.dest(paths.dist));
    });

    // CSS auto-prefix and minify
    gulp.task('autoprefixer', ['clean', 'sass'], function () {
        gulp.src(paths.css)
            .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(minifyCSS())
            .pipe(gulp.dest(paths.themeDest));
        gulp.src(paths.fonts)
            .pipe(gulp.dest(paths.themeDest));
    });

    // browser-sync task for starting server
    gulp.task('browser-sync', function () {
        if (env === 'production') {
            browserSync({
                server: {
                    baseDir: './dist'
                },
                port: host.port
            });
        } else {
            browserSync({
                server: {
                    baseDir: './app',
                    middleware: [
                        modRewrite([
                            '!\\. /index.html [L]'
                        ])
                    ]
                },
                port: host.port
            });
        }
    });

    gulp.task('bs-reload', function () {
        browserSync.reload();
    });

    // run in development mode with easy browser reloading
    gulp.task('dev', ['browser-sync'], function () {

        gulp.watch('app/views/**/*.html', [browserSync.reload]);
        gulp.watch('app/styles/**/*.css', [browserSync.reload]);
        gulp.watch('app/styles/**/*.scss', ['sass', browserSync.reload]);
        gulp.watch('app/scripts/**/*.js', ['jshint', browserSync.reload]);
    });

    gulp.task('serve', ['build', 'dev']);

    gulp.task('default', ['build']);

    // Run this task tell foundation which theme to use

    gulp.task('build', function () {
        var jsCode, themesData;
        themesData = '';

        recursive(paths.themesDir, function (err, files) {
            var i, theme, filePath, parts, regExp;
            theme = null;
            regExp = new RegExp('app[/\\\\]themes[/\\\\](\\w+)[/\\\\](.+)', 'i');

            jsCode = '/* jshint ignore:start */\n' +
                '(function (define) {\n' +
                '"use strict";\n' +
                'define(function () {\n' +
                'return {\n';

            for (i = 0; i < files.length; i += 1) {
                filePath = files[i];
                parts = filePath.match(regExp);
                if (parts instanceof Array) {
                    if (theme !== parts[1] && theme === null) {
                        themes.push(parts[1]);
                        jsCode += '\'' + parts[1] + '\' : [\n';
                    }
                    if (theme !== parts[1] && theme !== null) {
                        themes.push(parts[1]);
                        jsCode += '],\n\'' + parts[1] + '\' : [\n';
                    }
                    jsCode += '\'/' + parts[2] + '\',\n';
                    theme = parts[1];
                }
            }

            jsCode += ']\n};\n' +
                '});\n' +
                '})(window.define);\n' +
                '/* jshint ignore:end */';

            fs.writeFile('./app/scripts/design/themeFiles.js', jsCode, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            themesData = '{';
            for (i = 0; i < themes.length; i += 1) {
                themesData += '"' + themes[i] + '":"' + themes[i] + '"';
                if (i < themes.length - 1) {
                    themesData += ',';
                }
            }
            themesData += '}';

            if (env === 'development') {
                setConfigValue("options", "themes.list.active", themesData);
                setConfigValue("value", "general.app.foundation_url", DEV_FOUNDATION_URI);
                initConfigs(DEV_FOUNDATION_URI);
            } else if (env === 'wercker') {
                gulp.start('requirejs');
                gulp.start('vendor');
                gulp.start('misc');
                gulp.start('html');
                gulp.start('autoprefixer');
                gulp.start('imagemin');
            } else if (env === 'production' || env === 'staging') {
                setConfigValue("options", "themes.list.active", themesData);
                setConfigValue("value", "general.app.foundation_url", FOUNDATION_URI);
                initConfigs(FOUNDATION_URI);

                gulp.start('requirejs');
                gulp.start('vendor');
                gulp.start('misc');
                gulp.start('html');
                gulp.start('autoprefixer');
                gulp.start('imagemin');
            }
        });

    });

})();
