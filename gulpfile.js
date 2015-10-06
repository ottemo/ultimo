var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
var modRewrite = require('connect-modrewrite');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')({
    lazy: true
});

/**
 * yargs variables can be passed in to alter the behavior
 * Note: We will only use the production api when env=production
 * Example: gulp build
 *
 * --env=(production|*)
 * Applies revision thumbprints, minifies media, uses relavent robots...
 *
 * --api=(production|staging|localhost)
 * Sets the config.js variables, primarilly the api to connect to,
 * defaults to `staging`
 */

config.isProduction = (args.env == 'production');
config.apiConfig = args.api || 'staging';

if (config.isProduction) {
    if (config.apiConfig !== 'production') {
        log('When env is production the api will be automatically forced to production');
    }
    config.apiConfig = 'production';
};

/**
 * List the tasks available
 */
gulp.task('help', $.taskListing.withFilters(null, 'default'));
gulp.task('default', ['help']);

/**
 * Build the app
 * This is typically used when getting ready to deploy the app
 * `gulp build --env=production`
 */
gulp.task('build', function() {
    runSequence('clean', 'config', 'compile', 'revision');
});

/**
 * Build and start a server
 * This is typically used for local development work
 * `gulp serve` or `gulp serve --api=localhost`
 */
gulp.task('serve', ['build'], function() {
    gulp.start('serve_watch');
});

/**
 * Remove all build / temp files
 */
gulp.task('clean', function(done) {
    del([config.build], done);
});

/**
 * Vet the code
 */
gulp.task('vet', function() {
    return gulp.src(config.scripts.app)
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')));
});

/**
 * Configure the application
 * --api=(production|staging|localhost)
 */
gulp.task('config', ['clean'], function() {
    // Read the settings from the right file
    var filename = config.apiConfig + '.json';
    var settings = JSON.parse(fs.readFileSync('./config/' + filename, 'utf8'));

    // Replace each placeholder with the correct value for the variable.
    return gulp.src('config/config.js')
        .pipe($.replaceTask({
            patterns: [{
                match: 'apiUrl',
                replacement: settings.apiUrl
            }, {
                match: 'idFacebook',
                replacement: settings.idFacebook
            }, {
                match: 'idGoogle',
                replacement: settings.idGoogle
            }]
        }))
        .pipe(gulp.dest('./src/app/'));
});

/**
 * Run all compiling tasks
 */
gulp.task('compile', [
    'compile_html',
    'compile_misc',
    'compile_robots',
    'compile_scripts',
    'compile_styles',
    'compile_media',
    'compile_fonts'
]);

/**
 * Compile all javascript
 */
gulp.task('compile_scripts', ['compile_scripts_app', 'compile_scripts_lib', 'compile_scripts_ie']);

gulp.task('compile_scripts_app', function() {
    return gulp.src(config.scripts.app)
        .pipe($.sourcemaps.init())
        .pipe($.plumber(handleError))
        .pipe($.uglify({
            mangle: false
        }))
        .pipe($.plumber.stop())
        .pipe($.concat('main.js'))
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.build + 'scripts'))
        .pipe($.livereload());
});

gulp.task('compile_scripts_lib', function() {
    return gulp.src(config.scripts.lib)
        .pipe($.concat('lib.js'))
        .pipe(gulp.dest(config.build + 'scripts'));
});

gulp.task('compile_scripts_ie', function() {
    return gulp.src(config.scripts.ie)
        .pipe($.concat('lib-ie.js'))
        .pipe(gulp.dest(config.build + 'scripts'));
});

/**
 * Compile all of the html files
 */
gulp.task('compile_html', ['compile_html_root', 'compile_html_nonroot']);

gulp.task('compile_html_root', function() {
    return gulp.src(config.html.root)
        .pipe($.changed(config.build))
        .pipe(gulp.dest(config.build));
});

gulp.task('compile_html_nonroot', function() {
    return gulp.src(['!' + config.html.root, config.html.all])
        .pipe($.changed(config.build + 'views/'))
        .pipe(gulp.dest(config.build + 'views/'));
})

/**
 * Compile the robots.txt file
 * --env=(production|*)
 */
gulp.task('compile_robots', function() {
    var robotPath = config.isProduction ? config.robots.prod : config.robots.default;
    return gulp.src(robotPath)
        .pipe($.rename('robots.txt'))
        .pipe(gulp.dest(config.build));
});

/**
 * Compile oddball files
 */
gulp.task('compile_misc', function() {
    return gulp.src(config.misc)
        .pipe(gulp.dest(config.build));
});

/**
 * Compile styles
 * SASS -> CSS -> app.min.css
 */
gulp.task('compile_styles', function() {
    return gulp.src(config.styles.root)
        .pipe($.sourcemaps.init())
        .pipe($.plumber(handleError))
        .pipe($.sass.sync(config.sassSettings))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe($.plumber.stop())
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.build + 'styles/'))
        .pipe($.livereload());
});

/**
 * Move and minify images / mixed-media
 */
gulp.task('compile_media', function() {
    //TODO: do we want to have like a local-media folder?
    var mediaBuild = config.build + 'images/';

    return gulp.src(config.media)
        .pipe($.changed(mediaBuild))
        .pipe($.if(config.isProduction, $.imagemin()))
        .pipe(gulp.dest(mediaBuild));
});

/**
 * Move fonts
 */
gulp.task('compile_fonts', function() {
    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts/'));
})

/**
 * Watch files for changes and compile
 */
gulp.task('serve_watch', function() {
    $.livereload.listen({
        basePath: config.build
    });

    gulp.start('serve_server');

    gulp.watch(config.html.all, ['compile_html']);
    gulp.watch(config.styles.all, ['compile_styles']);
    gulp.watch(config.scripts.lib, ['compile_scripts_lib']);
    gulp.watch(config.scripts.ie, ['compile_scripts_ie']);
    gulp.watch(config.scripts.app, ['compile_scripts_app']);
});

/**
 * Starts a server in the build directory
 */
gulp.task('serve_server', function() {
    var express = require('express');
    var path = require('path');
    var app = express();
    var staticFolder = path.join(__dirname, config.build);

    app.use(modRewrite(['!\\. /index.html [L]']))
        .use(express.static(staticFolder));

    app.listen(config.node.port, function() {
        log('-------------------------------------');
        log('server started: http://localhost:' + config.node.port);
        log('-------------------------------------');
        return gulp;
    });
});

/**
 * Thumbprint js, css
 * Only fires for production
 * --env=(production|*)
 */
gulp.task('revision', function() {
    if (config.isProduction) {
        var revAll = new $.revAll({
            dontUpdateReference: [/^((?!.js|.css).)*$/g],
            dontRenameFile: [/^((?!.js|.css).)*$/g]
        });

        return gulp.src(config.build + '**')
            .pipe(revAll.revision())
            .pipe(gulp.dest(config.build));
    }
});

////////////////////////////////

function handleError(err) {
    log('# Error in ' + err.plugin);
    if (err.fileName) {
        log('File: %s:%s', err.fileName, err.lineNumber);
    }
    log('Error Message: %s', err.message);
    $.util.beep();
}

function log(msg) {
    $.util.log($.util.colors.magenta(msg));
}
