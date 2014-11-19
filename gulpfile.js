(function () {
    'use strict';

    var gulp, minifyHTML, concat, stripDebug, uglify, jshint, changed, imagemin, autoprefix, sass, rjs, minifyCSS,
        browserSync, pngquant, del, paths, host, themes, fs, request, recursive, FOUNDATION_URI, THEME_AS_DEFAULT;

    gulp = require('gulp');
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
        "vendorTheme": 'app/themes/**/lib/*',
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

    themes = [];
    FOUNDATION_URI = 'http://localhost:3000';
    THEME_AS_DEFAULT = 'default';

    var setFoundationUri = function (request) {
        request({
            uri: FOUNDATION_URI + '/config/unregister/general.app.foundation_url',
            method: 'DELETE'
        }, function () {
            var r = request.post(FOUNDATION_URI + '/config/register');
            var form = r.form();
            form.append('path', 'general.app.foundation_url');
            form.append('value', FOUNDATION_URI);
            form.append('type', 'varchar(255)');
            form.append('editor', 'text');
            form.append('options', '');
            form.append('label', 'Foundation host URL');
            form.append('description', 'URL application will use to generate foundation resources links');
        });
    };

    var initThemeConfig = function (request) {
        request({
            uri: FOUNDATION_URI + '/config/unregister/themes',
            method: 'DELETE'
        }, function () {
            var r = request.post(FOUNDATION_URI + '/config/register');
            var form = r.form();
            form.append('path', 'themes');
            form.append('value', '');
            form.append('type', 'group');
            form.append('editor', '');
            form.append('options', '');
            form.append('label', 'Themes');
            form.append('description', '');
        });
    };

    var initThemeGroup = function (request) {
        request({
            uri: FOUNDATION_URI + '/config/unregister/themes.list',
            method: 'DELETE'
        }, function () {
            var r = request.post(FOUNDATION_URI + '/config/register');
            var form = r.form();
            form.append('path', 'themes.list');
            form.append('value', '');
            form.append('type', 'group');
            form.append('editor', 'themes_manager');
            form.append('options', '');
            form.append('label', 'Themes');
            form.append('description', '');
        });
    };

    var setThemeData = function (request, themesData) {
        request({
            uri: FOUNDATION_URI + '/config/unregister/themes.list.active',
            method: 'DELETE'
        }, function () {
            var r = request.post(FOUNDATION_URI + '/config/register');
            var form = r.form();
            form.append('path', 'themes.list.active');
            form.append('value', THEME_AS_DEFAULT);
            form.append('type', '');
            form.append('editor', 'themes_manager');
            form.append('options', themesData);
            form.append('label', 'Active theme');
            form.append('description', 'Active theme on storefront');
        });
    };

    // Empties folders to start fresh
    gulp.task('clean', function (cb) {
        del(['dist'], cb);
    });

    // Actions with js-files from theme
    gulp.task('vendorTheme', ['clean'], function () {
        /**
         * Minify and uglify the custom scripts in folder 'scripts' in each theme
         */
        gulp.src('app/themes/**/scripts/**/*.js')
            .pipe(stripDebug())
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

    // Protractor tests
    // gulp.task('protractorUpdate', protractor.webdriverUpdate);
    // gulp.task('protractor', ['protractorUpdate'], function (cb) {
    //     gulp.src(['tests/e2e/**/*.js']).pipe(protractor.protractor({
    //         configFile: 'protractor.conf.js'
    //     })).on('error', function (e) {
    //         console.log(e);
    //     }).on('end', cb);
    // });
    //
    // // Jasmine test
    // gulp.task('jasmine', function() {
    //     gulp.src('spec/**/*.js')
    //         .pipe(jasmine({verbose:true, includeStackTrace: true}));
    // });
    //
    // gulp.task('test', ['protractor', 'jasmine'], function () {});

    // browser-sync task for starting server
    gulp.task('browser-sync', function () {
        browserSync({
            server: {
                baseDir: './app'
            },
            port: host.port
        });
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

    gulp.task('serve', ['dev', 'retrieve-files']);

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

            setFoundationUri(request);
            initThemeConfig(request);
            initThemeGroup(request);
            setThemeData(request, themesData);

            gulp.start('requirejs');
            gulp.start('vendor');
            gulp.start('misc');
            gulp.start('html');
            gulp.start('autoprefixer');
            gulp.start('imagemin');
        });
    });

    gulp.task('default', ['build']);

    gulp.task('retrieve-files', function () {
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

            setFoundationUri(request);
            initThemeConfig(request);
            initThemeGroup(request);
            setThemeData(request, themesData);
        });

    });

})();