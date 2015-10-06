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
 * --api=(production|staging|localhost)
 */

config.isProduction = (args.env == 'production');
config.apiConfig = args.api || 'staging';

// If the env is production override any api configurations
if (config.isProduction) {
    config.apiConfig = 'production';
};

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

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

gulp.task('scripts', ['scripts-app', 'scripts-lib', 'scripts-ie']);

gulp.task('scripts-app', function() {
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

gulp.task('scripts-lib', function() {
    return gulp.src(config.scripts.lib)
        .pipe($.concat('lib.js'))
        .pipe(gulp.dest(config.build + 'scripts'));
});

gulp.task('scripts-ie', function() {
    return gulp.src(config.scripts.ie)
        .pipe($.concat('lib-ie.js'))
        .pipe(gulp.dest(config.build + 'scripts'));
});

gulp.task('clean', function(done) {
    del([config.build], done);
});

gulp.task('jshint', function() {
    return gulp.src(config.scripts.app)
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')));
});

gulp.task('html', ['html-root', 'html-nonroot']);

gulp.task('html-root', function() {
    return gulp.src(config.html.root)
        .pipe($.changed(config.build))
        .pipe(gulp.dest(config.build));
});
gulp.task('html-nonroot', function() {
    return gulp.src(['!' + config.html.root, config.html.all])
        .pipe($.changed(config.build + 'views/'))
        .pipe(gulp.dest(config.build + 'views/'));
})

gulp.task('robots', function() {
    var robotPath = config.isProduction ? config.robots.prod : config.robots.default;
    return gulp.src(robotPath)
        .pipe($.rename('robots.txt'))
        .pipe(gulp.dest(config.build));
});

gulp.task('misc', function() {
    return gulp.src(config.misc)
        .pipe(gulp.dest(config.build));
});

gulp.task('styles', function() {
    return gulp.src(config.styles)
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

gulp.task('media', function() {
    //TODO: do we want to have like a local-media folder?
    var mediaBuild = config.build + 'images/';

    return gulp.src(config.media)
        .pipe($.changed(mediaBuild))
        .pipe($.if(config.isProduction, $.imagemin()))
        .pipe(gulp.dest(mediaBuild));
});

gulp.task('fonts', function() {
    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts/'));
})

gulp.task('watch', function() {
    $.livereload.listen({
        basePath: config.build
    });

    gulp.start('livereload');

    gulp.watch([config.html.all], ['html']);
    gulp.watch(['./src/app/**/*.scss', './src/app/**/*.css'], ['styles']);

    var libScripts = [].concat(config.scripts.lib, config.scripts.ie);
    gulp.watch(libScripts, ['scripts-lib', 'scripts-ie']);
    gulp.watch(config.scripts.app, ['scripts-app']);
});

gulp.task('livereload', function() {
    var path = require('path');
    var express = require('express');
    var app = express();
    var staticFolder = path.join(__dirname, 'dist');

    app.use(modRewrite(['!\\. /index.html [L]']))
        .use(express.static(staticFolder));

    app.listen(host.port, function() {
        console.log('server started: http://localhost:' + host.port);
        return gulp;
    });
});

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

gulp.task('compile', [
    'html',
    'misc',
    'robots',
    'scripts',
    'styles',
    'media',
    'fonts'
]);

gulp.task('build', function() {
    runSequence('clean', 'config', 'compile', 'revision');
});

// For development
gulp.task('serve', function() {
    runSequence('clean', 'config', 'compile');
    gulp.start('watch');
});

////////////////////////////////
var handleError = function(err) {
    $.util.log($.util.colors.red('# Error in ' + err.plugin));
    if (err.fileName) {
        $.util.log('File: %s:%s', err.fileName, err.lineNumber);
    }
    $.util.log('Error Message: %s', err.message);
    $.util.beep();
}

