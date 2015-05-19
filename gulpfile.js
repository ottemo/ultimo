var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var concat = require('gulp-concat');
var refresh = require('gulp-livereload');
var modRewrite = require('connect-modrewrite');
var RevAll = require('gulp-rev-all');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    dist: 'dist',
    jshint: [
        'app/scripts/**/*.js',
        'app/theme/**/*.js'
    ],
    html: 'app/**/*.html',
    misc: 'app/*.{txt,htaccess,ico}',
    scripts: [
        'app/scripts/config.js',
        'app/scripts/main.js',
        'app/scripts/**/init.js',
        'app/scripts/**/*.js'
    ],
    theme: {
        dist: 'dist/theme',
        css: 'app/theme/styles/**/*.css',
        images: 'app/theme/**/*.{png,gif,jpg,jpec,ico,svg,mp4}',
        fonts: 'app/theme/fonts/**/*',
        scripts: [
            'app/theme/lib/**/*.js',
            'app/theme/**/*.js'
        ]
    },
    lib: {
        dist: 'dist/lib',
        scripts: [
            'app/lib/jquery.min.js',
            'app/lib/angular.min.js',
            'app/lib/*.js' // NOTE: no folder glob, or it would clobber .ie
        ],
        ie: 'app/lib/ie/*.js'
    }
};

var host = {
    port: '8080',
    lrPort: '35729'
};

var env = process.env.NODE_ENV || 'development';

// Empties folders to start fresh
gulp.task('clean', function (cb) {
    return del(['dist/*', '!dist/media'], cb);
});

gulp.task('jshint', function () {
    return gulp.src(paths.jshint)
        .pipe(jshint())
        .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('html', function () {
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

gulp.task('misc', function () {
    return gulp.src(paths.misc)
        .pipe(gulp.dest(paths.dist));
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.dist + '/scripts'))
        .pipe(refresh());
});

gulp.task('theme.css', function () {
    return gulp.src(paths.theme.css)
        .pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.theme.dist + '/styles'));
});

gulp.task('theme.fonts', function() {
    return gulp.src(paths.theme.fonts)
        .pipe(gulp.dest(paths.theme.dist + '/fonts'));
});

gulp.task('theme.scripts', function () {
    return gulp.src(paths.theme.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.theme.dist))
        .pipe(refresh());
});

gulp.task('theme.images', function () {
    return gulp.src(paths.theme.images)
        .pipe(changed(paths.theme.dist))
        .pipe(imagemin())
        .pipe(gulp.dest(paths.theme.dist));
});

gulp.task('lib.scripts', function () {
    return gulp.src(paths.lib.scripts)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(paths.lib.dist));
});

// IE libs can stick together, but need to be separate from other libs
gulp.task('lib.ie', function() {
    return gulp.src(paths.lib.ie)
        .pipe(concat('ie-libs.js'))
        .pipe(gulp.dest(paths.lib.dist));
});




gulp.task('watch',function(){
    refresh.listen({ basePath: paths.dist });

    gulp.start('livereload');

    gulp.watch(["app/**/*.html"],['html']);
    gulp.watch(["app/**/*.css"],['theme.css']);
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
        console.log('server started, port ' + host.port);
        return gulp;
    });
});

gulp.task('revision', function(){
    if(env === 'production') {
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
    'theme.css',
    'theme.fonts',
    'theme.scripts',
    'theme.images'
]);

// For production
gulp.task('build', function(){
    // note: revision has a short circuit for dev
    runSequence('clean', [
        'html',
        'misc',
        'scripts',
        'theme',
        'lib'
    ], 'revision');
});

// For development
gulp.task('serve', ['default']);
gulp.task('default', ['build'], function(){
    gulp.start('watch');
});