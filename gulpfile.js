var gulp        = require('gulp');
var fs          = require('fs');
var minifyHTML  = require('gulp-minify-html');
var uglify      = require('gulp-uglify');
var jshint      = require('gulp-jshint');
var changed     = require('gulp-changed');
var imagemin    = require('gulp-imagemin');
var autoprefix  = require('gulp-autoprefixer');
var del         = require('del');
var concat      = require('gulp-concat');
var refresh     = require('gulp-livereload');
var modRewrite  = require('connect-modrewrite');
var RevAll      = require('gulp-rev-all');
var runSequence = require('run-sequence');
var sourcemaps  = require('gulp-sourcemaps');
var sass        = require('gulp-sass');
var rename      = require('gulp-rename');
var replace     = require('gulp-replace-task');
var gulpIf      = require('gulp-if');
var gutil       = require('gulp-util');
var plumber     = require('gulp-plumber');


var app = './src/app/';

var paths = {
    build: './dist/',
    html: app + '**/*.html',
    misc: app + '*.{htaccess,ico,xml}',
    robots: {
        default: app + 'robots.dev.txt',
        prod: app + 'robots.prod.txt'
    },
    styles: app + 'app.scss',
    media: app + '**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf,eot,ttf,woff}',
    scripts: {
        app: [
            '!./src/app/_lib', // not lib
            app + 'config.js',
            app + 'main.js',
            app + '**/init.js',
            app + '**/*.js'
        ],
        lib: [
            app + '_lib/jquery.min.js',
            app + '_lib/angular.min.js',
            // NOTES:
            // no folder glob, or it would clobber .ie
            // also we are only moving minified files, so feel free to toss unminified reference files in the lib dir
            app + '_lib/*.min.js'
        ],
        ie: app + '_lib/ie/*.min.js'
    }
};

var config = {
    htmlMinify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeCommentsFromCDATA: true,
        removeOptionalTags: true,
        conditionals: true,
        quotes: true,
        empty: true
    }
}

var host = {
    port: '8080',
    lrPort: '35729'
};

var isProduction = false;
var envOttemo = process.env.OTTEMO_ENV || 'staging';

gulp.task('config', ['clean'], function () {
    // Read the settings from the right file
    var filename = envOttemo + '.json';
    var settings = JSON.parse(fs.readFileSync('./config/' + filename, 'utf8'));

    // Replace each placeholder with the correct value for the variable.
    return gulp.src('config/config.js')
    .pipe(replace({
        patterns: [
            {
                match       : 'apiUrl',
                replacement : settings.apiUrl
            },
            {
                match       : 'idFacebook',
                replacement : settings.idFacebook
            },
            {
                match       : 'idGoogle',
                replacement : settings.idGoogle
            }
        ]
    }))
    .pipe(gulp.dest('./src/app/'));
});

gulp.task('scripts', ['scripts-app', 'scripts-lib', 'scripts-ie']);

gulp.task('scripts-app', function () {
    return gulp.src(paths.scripts.app)
        .pipe(sourcemaps.init())
        .pipe(plumber(handleError))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(plumber.stop())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.build + 'scripts'))
        .pipe(refresh());
});

gulp.task('scripts-lib', function () {
    return gulp.src(paths.scripts.lib)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(paths.build + 'scripts'));
});

// IE libs can stick together, but need to be separate from other libs
gulp.task('scripts-ie', function() {
    return gulp.src(paths.scripts.ie)
        .pipe(concat('ie-libs.js'))
        .pipe(gulp.dest(paths.build + 'scripts'));
});

// Empties folders to start fresh
gulp.task('clean', function (done) {
    del([paths.build], done);
});

gulp.task('jshint', function () {
    return gulp.src(paths.scripts.app)
        .pipe(jshint())
        .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(changed(paths.build))
        .pipe(minifyHTML(config.htmlMinify))
        .pipe(gulp.dest(paths.build));
});

gulp.task('robots', function () {
    var robotPath = isProduction ? paths.robots.prod : paths.robots.default;
    return gulp.src(robotPath)
        .pipe(rename('robots.txt'))
        .pipe(gulp.dest(paths.build));
});

gulp.task('misc', function(){
    return gulp.src(paths.misc)
        .pipe(gulp.dest(paths.build));
});

gulp.task('theme.styles', function() {
    return gulp.src(paths.theme.styles)
        .pipe(sourcemaps.init())
        .pipe(plumber(handleError))
        .pipe(sass.sync({
            outputStyle: 'compressed',
            precision: 8,
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.theme.dist + '/styles'))
        .pipe(refresh());
});

gulp.task('theme.media', function () {
    return gulp.src(paths.theme.media)
        .pipe(changed(paths.theme.dist))
        .pipe(gulpIf(isProduction, imagemin()))
        .pipe(gulp.dest(paths.theme.dist));
});

gulp.task('watch',function(){
    refresh.listen({ basePath: paths.dist });

    gulp.start('livereload');

    gulp.watch(["app/**/*.html"],['html']);
    gulp.watch(["app/**/*.scss","app/**/*.css"],['theme.styles']);
    gulp.watch(["app/scripts/**/*.js"],['scripts']);
    gulp.watch(["app/theme/**/*.js"],['theme.scripts']);
});

gulp.task('livereload', function(){
    var path = require('path');
    var express = require('express');
    var app = express();
    var staticFolder = path.join(__dirname, 'dist');

    app.use(modRewrite([
        '!\\. /index.html [L]'
    ]))
        .use(express.static(staticFolder));

    app.listen( host.port, function() {
        console.log('server started: http://localhost:' + host.port);
        return gulp;
    });
});

gulp.task('revision', function(){
    if(isProduction) {
        var revAll = new RevAll({
            dontUpdateReference: [/^((?!.js|.css).)*$/g],
            dontRenameFile: [/^((?!.js|.css).)*$/g]
        });

        gulp.src('dist/**')
            .pipe(revAll.revision())
            .pipe(gulp.dest('dist'));
    }
});


gulp.task('lib', ['lib.ie', 'lib.scripts']);
gulp.task('theme', [
    'theme.styles',
    'theme.scripts',
    'theme.media'
]);

// For production
gulp.task('build-prod', function(){
    isProduction=true;
    runSequence('clean',
                'config',
                [ 'html', 'misc', 'robots', 'scripts', 'theme', 'lib' ],
                'revision');
});

// For development
gulp.task('build', function(){
    // note: revision has a short circuit for dev
    runSequence('clean',
                'config',
                [ 'html', 'misc', 'robots', 'scripts', 'theme', 'lib' ],
                'revision');
});

// For development
gulp.task('serve', ['default']);
gulp.task('default', ['build'], function(){
    isProduction = false;
    gulp.start('watch');
});

////////////////////////////////
var handleError = function(err) {
    gutil.log(gutil.colors.red('# Error in ' + err.plugin));
    if (err.fileName) {
        gutil.log('File: %s:%s', err.fileName, err.lineNumber);
    }
    gutil.log('Error Message: %s', err.message);
    gutil.beep();
}