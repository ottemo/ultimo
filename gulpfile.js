(function () {
    'use strict';

    var gulp = require('gulp');
    var watchify = require('watchify');
    var gutil = require('gulp-util');
    var minifyHTML = require('gulp-minify-html');
    var stripDebug = require('gulp-strip-debug');
    var uglify = require('gulp-uglify');
    var jshint = require('gulp-jshint');
    var changed = require('gulp-changed');
    var imagemin = require('gulp-imagemin');
    var autoprefix = require('gulp-autoprefixer');
    var sass = require('gulp-sass');
    var minifyCSS = require('gulp-minify-css');
    var browserSync = require('browser-sync');
    var modRewrite = require('connect-modrewrite');
    var del = require('del');
    var fs = require('fs');
    var request = require('request');
    var recursive = require('recursive-readdir');
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var assign = require('lodash.assign');

    var paths = {
        'app': require('./bower.json').appPath || 'app',
        'dist': 'dist',

        // Core
        'js': 'app/scripts/**/*.js',
        'vendor': 'app/lib/**/*.js',

        // Theme Libs
        'vendorTheme': 'app/theme/**/lib/**/*',

        // Theme
        'theme': {
            'css': 'app/theme/styles/**/*.css',
            'images': 'app/theme/**/*.{png,jpg,jpec,ico}',
            'fonts': 'app/theme/fonts/**/*',
            'js': 'app/theme/scripts/**/*.js',
            'dest': 'dist/theme',
            'src': './app/theme'
        },

        // Static
        'html': 'app/**/*.html',
        'misc': 'app/*.{txt,htaccess,ico}'
    };

    var host = {
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
    var DEFAULT_ROOT = process.env.DEFAULT_ROOT || 'admin';
    var DEFAULT_PASS = process.env.DEFAULT_PASS || 'admin';

    var DEV_FOUNDATION_URI = process.env.DEV_FOUNDATION_URI || 'http://dev.ottemo.io:3000';
    var FOUNDATION_URI = process.env.FOUNDATION_URI || 'http://dev.ottemo.io:3000';

//    gutil.log("Your db settings and your environment settings must match when");
//    gutil.log("running 'gulp build' or your templates will be blank.  Example");
//    gutil.log("");
//    gutil.log("    $ NODE_ENV=development DEFAULT_ROOT=admin DEFAULT_PASS=admin FOUNDATION_URI=http://<server>:<port> gulp build");
//    gutil.log("");
//    gutil.log("Your current ENV settings are: ");
//    gutil.log("");
//    gutil.log("NODE_ENV = ", env);
//    gutil.log("DEV_FOUNDATION_URI = ", DEV_FOUNDATION_URI);
//    gutil.log("FOUNDATION_URI = ", FOUNDATION_URI);
//    gutil.log("");


    // Print a node stack trace upon error
    gulp.on('err', function(e) {
        console.log(e.err.stack);
    });

    // Empties folders to start fresh
    gulp.task('clean', function (cb) {
        del(['dist/*', '!dist/media'], cb);
    });

    // copy vendor js
    gulp.task('vendor', ['clean'], function () {
        gulp.src(paths.vendorTheme)
            .pipe(gulp.dest(paths.theme.dest));
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

    /* Start Browserify */
    function bundle() {
        return b.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./app'));
    }
    var customOpts = {
        entries: ['./app/scripts/main.js'],
        debug: false
    };

    var b = watchify(browserify(assign({}, watchify.args, customOpts)));

    if(env === 'development') {
        gulp.task('browserify', bundle);
        b.on('update', bundle);
        b.on('log', gutil.log);
    } else {
        // production build
        gulp.task('browserify', function () {
            return browserify()
                .add('./app/scripts/main.js')
                .bundle()
                .on('error', gutil.log.bind(gutil, 'Browserify Error'))
                .pipe(source('bundle.js'))
                .pipe(buffer())
                .pipe(uglify({mangle: false}))
                .pipe(gulp.dest('./dist'));
        });
    }
    /* End Browserify */

    // minify new images
    gulp.task('imagemin', ['clean'], function () {
        return gulp.src(paths.theme.images)

            .pipe(changed(paths.theme.dest))
            .pipe(imagemin())
            .pipe(gulp.dest(paths.theme.dest));
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
    gulp.task('css', ['clean'], function () {
        gulp.src(paths.theme.css)
            .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(minifyCSS())
            .pipe(gulp.dest(paths.theme.dest + '/styles'));

        gulp.src(paths.theme.fonts)
            .pipe(gulp.dest(paths.theme.dest + '/fonts'));
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

    // run in development mode with easy browser reloading
    gulp.task('serve', ['build','browser-sync'], function () {
        gulp.watch(paths.html, [browserSync.reload]);
        gulp.watch(paths.css, [browserSync.reload]);
        gulp.watch([paths.js, paths.theme.js], ['browserify', browserSync.reload]);
    });

    gulp.task('default', ['build']);

    // build task
    gulp.task('build', function () {

        if (env === 'development') {
            //gulp.start('jshint')
            gulp.start('vendor');
            gulp.start('misc');
            gulp.start('html');
            gulp.start('css');
            gulp.start('imagemin');
            gulp.start('browserify');
        } else {
            gulp.start('vendor');
            gulp.start('misc');
            gulp.start('html');
            gulp.start('css');
            gulp.start('imagemin');
            gulp.start('browserify');
        }
    });

})();
