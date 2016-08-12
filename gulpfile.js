/*jshint node: true */

var args = require('yargs').argv;
var path = require('path');
var glob = require('glob');
var colors = require('chalk');
var config = require('./gulp.config')();
var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
var md5 = require('md5');
var modRewrite = require('connect-modrewrite');
var runSequence = require('run-sequence');
var siphonMQ = require('siphon-media-query');
var nginclude = require('./gulp.nginclude');
var $ = require('gulp-load-plugins')({
    lazy: true
});

/**
 * yargs variables can be passed in to alter the behavior of tasks
 */
gulp.task('default', ['help']);
gulp.task('help', function() {
    logHead('Options');
    logBody([
        '--env=[prod|staging|local]',
        '    Controls applying revision thumbprints, minifying media, choosing robots.txt',
        '    "prod" forces the api to production',
        '    Defaults to local',
        '',
        '--config=[prod|staging|local]',
        '    Sets which config file to use. `/config/*.json`',
        '    Settings include; useStrict, apiUrl, fbAppId, googleClientId, googleAnalyticsId',
        '    Defaults to staging',
    ], 1);

    logHead('Example Usage');
    logBody('Make a production build',1);
    logBody('`gulp build --env=prod --config=prod`', 2, 'cyan');
    logBody('');
    logBody('Start a development server',1);
    logBody('`gulp serve`', 2, 'cyan');
    logBody('');
    logBody('Start a development server using a local api server',1);
    logBody('`gulp serve --config=local`', 2, 'cyan');

    return $.taskListing.withFilters(null, 'default')();
});

activate();

//////////////////////////////

function activate() {
    // no task selected
    if (args._.length === 0) {
        return;
    }

    // Read the args, and set defaults
    config.env = args.env || 'local';
    config.configFile = args.config || 'staging';

    // The `env` arg drives whether or not this is production
    config.isEnvProduction = (config.env === 'prod');
    config.isEnvStaging = (config.env === 'staging');
    config.isEnvLocal = (config.env === 'local');

    logHead('Argument Feedback');
    if (config.isEnvProduction) {
        if (config.configFile !== 'prod') {
            logBody('When `env=prod` we enforce that `config=prod`', 1, 'red');
        }
        config.configFile = 'prod';
    }

    logBody([
        '--env=' + config.env,
        '--config=' + config.configFile,
        '',
    ], 1, 'cyan');

    // Assign the application settings from the config folder
    // this read is sync
    config.settings = readConfig(config.configFile);
}

/**
 * Read the settings from the right file
 */
function readConfig(configFile) {
    return JSON.parse(fs.readFileSync('./config/' + configFile + '.json', 'utf8'));
}

/**
 * Build the app
 * This is typically used when getting ready to deploy the app
 * `gulp build --env=prod`
 */
gulp.task('build', function build(cb) {
    runSequence('clean', 'config', 'compile', 'revision', cb);
});

/**
 * Build and start a server
 * This is typically used for local development work
 * `gulp serve` or `gulp serve --config=local`
 */
gulp.task('serve', ['build'], function serve() {
    gulp.start('serve_watch');
});

/**
 * Vet the code
 */
gulp.task('vet', function vet() {
    return gulp.src(config.scripts.app)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

/**
 * Remove all build / temp files
 */
gulp.task('clean', function clean(done) {
    del([config.build], done);
});

/**
 * Replace the config placeholders with the correct value for the variable
 * from the config files in /config. Then move the file to a tmp folder
 *
 * `gulp build --config=(prod|staging|local)`
 */
gulp.task('config', function() {
    var replacePattern = {
        patterns: [{
            json: config.settings
        }]
    };

    return gulp.src('config/config.js')
        .pipe($.replaceTask(replacePattern))
        .pipe(gulp.dest(config.temp));
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
    'compile_fonts',
    'compile_emails',
]);


/**
 * Compile all javascript
 */
gulp.task('compile_scripts', ['compile_scripts_app', 'compile_scripts_lib']);

gulp.task('compile_scripts_app', function compile_scripts_app() {
    // Load app config before other scripts
    var scriptsAppPaths = applyThemesToPaths(config.scripts.app, config.app);

    // REFACTOR: This makes dev/staging/production different... :-1:
    // uglify + concat breaks sourcemaps so don't use it unless we are on production
    // https://github.com/terinjokes/gulp-uglify/issues/105
    if (config.isEnvProduction || config.isEnvStaging) {
        return gulp.src(scriptsAppPaths)
            .pipe($.plumber(handleError))
            .pipe($.tap(resolveControllersNames))
            .pipe($.uglify(config.uglifySettings))
            .pipe($.plumber.stop())
            .pipe($.concat('main.js'))
            .pipe(gulp.dest(config.build + 'scripts'));
    } else {
        return gulp.src(scriptsAppPaths)
            .pipe($.tap(resolveControllersNames))
            .pipe($.concat('main.js'))
            .pipe(gulp.dest(config.build + 'scripts'));
    }
});

gulp.task('compile_scripts_lib', function compile_scripts_lib() {
    return gulp.src(applyThemesToPaths(config.scripts.lib))
        .pipe($.concat('lib.js'))
        .pipe(gulp.dest(config.build + 'scripts'));
});

/**
 * Compile all of the html files
 */
gulp.task('compile_html', ['compile_html_root', 'compile_html_nonroot']);

gulp.task('compile_html_root', function() {
    var replacePattern = {
        patterns: [{
            json: config.settings
        }]
    };

    return gulp.src(applyThemesToPaths(config.html.root))
        .pipe($.replaceTask(replacePattern))
        .pipe(nginclude({assetsDirs: [config.themePath, config.basePath]}))
        .pipe(gulp.dest(config.build));
});

gulp.task('compile_html_nonroot', function compile_html_nonroot() {
    return gulp.src(applyThemesToPaths(config.html.nonRoot))
        .pipe(nginclude({assetsDirs: [config.themePath, config.basePath]}))
        .pipe(gulp.dest(config.build + 'views/'));
});

/**
 * Compile the robots.txt file
 * --env=(prod|*)
 */
gulp.task('compile_robots', function compile_robots() {
    var robotPath = config.isEnvProduction ? config.robots.prod : config.robots.default;
    return gulp.src(applyThemesToPaths(robotPath))
        .pipe($.rename('robots.txt'))
        .pipe(gulp.dest(config.build));
});

/**
 * Compile oddball files
 */
gulp.task('compile_misc', function compile_misc() {
    return gulp.src(applyThemesToPaths(config.misc))
        .pipe(gulp.dest(config.build));
});

/**
 * Compile styles
 * SASS -> CSS -> app.min.css
 */
gulp.task('compile_styles', function compile_styles() {
    var isMinifyActive = config.isEnvProduction || config.isEnvStaging;
    var stylesRootTheme = (isThemeStylesRootPresent()) ? config.themePath : config.basePath;

    return gulp.src(config.styles.root.replace('{{themeRoot}}', stylesRootTheme))
        .pipe($.sourcemaps.init())
        .pipe($.sass(config.sassSettings).on('error', $.sass.logError))
        .pipe($.sourcemaps.write({sourceRoot: '.'}))
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe($.if(isMinifyActive, $.cleanCss()))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.sourcemaps.write({sourceRoot: '.'}))
        .pipe(gulp.dest(config.build + 'styles/'));
});

function isThemeStylesRootPresent() {
    return glob.sync(applyThemeToPath(config.styles.root, config.themePath)).length !== 0;
}

/**
 * Move and minify images / mixed-media
 */
gulp.task('compile_media', function compile_media() {

    var mediaBuild = config.build + 'images/';
    var isMinifyActive = config.isEnvProduction || config.isEnvStaging;

    return gulp.src(applyThemesToPaths(config.media))
        .pipe($.if(isMinifyActive, $.imagemin()))
        .pipe(gulp.dest(mediaBuild));
});

/**
 * Move fonts
 */
gulp.task('compile_fonts', function compile_fonts() {
    return gulp.src(applyThemesToPaths(config.fonts))
        .pipe(gulp.dest(config.build + 'fonts/'));
});

/**
 * Inline css for emails
 */
gulp.task('compile_emails', function compile_emails() {
    var css = fs.readFileSync(config.email.styles).toString();
    var mqCss = siphonMQ(css);

    return gulp.src(config.email.templates)
        .pipe($.inlineCss({
            applyStyleTags: false,       // currently removes trailing slashes on meta
        }))
        .pipe($.replaceTask({
            patterns: [{
                match: '<!-- <inline-style-injection> -->',
                replacement: '<style>' + mqCss + '</style>',
            }],
            usePrefix: false,
        }))
        .pipe($.htmlmin({
            // keepClosingSlash: true,  // would like to enable
            collapseWhitespace: true,
            conservativeCollapse: true, // breaks gmail if you remove me
            preserveLineBreaks: true,   // breaks gmail if you remove me
            minifyCSS: true,
            removeComments: true,
        }))
        .pipe($.insert.transform(function(content, f){
            // Email templates break if you have a carriage return after
            // this comment, so be careful
            var hash = md5(content);
            var header = '<!-- build:' + hash + ' -->';
            return header + content;
        }))
        .pipe($.rename({
            suffix: '.inline',
        }))
        .pipe(gulp.dest(config.email.dest));
});

/**
 * Watch files for changes and compile
 */
gulp.task('serve_watch', function serve_watch() {
    gulp.start('serve_server');

    // App
    gulp.watch(applyThemesToPaths(config.html.root),    ['compile_html_root']);
    gulp.watch(applyThemesToPaths(config.html.nonRoot), ['compile_html_nonroot']);
    gulp.watch(applyThemesToPaths(config.styles.all),   ['compile_styles']);
    gulp.watch(applyThemesToPaths(config.scripts.lib),  ['compile_scripts_lib']);
    gulp.watch(applyThemesToPaths(config.scripts.app),  ['compile_scripts_app']);

    // Emails
    gulp.watch(config.email.dest, ['compile_emails']);
});

/**
 * Starts a server in the build directory
 */
gulp.task('serve_server', function serve_server() {
    var express = require('express');
    var app = express();
    var staticFolder = path.join(__dirname, config.build);

    app.use(modRewrite(['!\\. /index.html [L]']))
        .use(express.static(staticFolder));

    app.listen(config.node.port, function() {
        logHead('Server Started');
        logBody([
            'Storefront: http://localhost:' + config.node.port,
            'Foundation: ' + config.settings['apiUrl'],
            '',
        ]);
        return gulp;
    });
});

/**
 * Thumbprint js, css for prod and staging
 * --env=(prod|*)
 */
gulp.task('revision', function revision() {
    if (config.isEnvProduction || config.isEnvStaging) {
        var revAll = new $.revAll({
            dontUpdateReference: ['.html'],
            dontRenameFile: ['.html']
        });

        return gulp.src(config.build + '**/*.{js,css,html}')
            .pipe(revAll.revision())
            .pipe(gulp.dest(config.build));
    }
});

////////////////////////////////

function handleError(err) {
    logHead('Error');
    logBody('Plugin: ' + err.plugin);
    if (err.fileName) {
        logBody('File: ' + err.fileName + ':' + err.lineNumber);
    }
    logBody('Message: ' + err.message);

    $.util.beep();
}

function logHead(msg) {
    var bar = '------------------------------';
    console.log('');
    console.log(colors.gray(msg));
    console.log(bar);
}

function logBody(msgs, prefixCount, strColor) {
    if (typeof prefixCount === 'undefined') {
        prefixCount = 1;
    }
    var prefix = repeat('    ', prefixCount);
    msgs = (typeof msgs === 'string') ? [msgs] : msgs;

    msgs.forEach(function(msg) {
        if (strColor) {
            msg = colors.styles[strColor].open + msg + colors.styles[strColor].close;
        }
        console.log(prefix + msg);
    });
}

function repeat(str, num) {
    var resp = '';
    if (num) {
        for (var i = 0; i < num; i++) {
            resp += str;
        }
    }
    return resp;
}

function applyThemesToPaths(paths, includePathBefore) {
    var result = includePathBefore ? [includePathBefore] : [];

    if (!Array.isArray(paths)) {
        paths = [paths];
    }

    paths.forEach(function(path) {
        result.push(applyThemeToPath(path, config.basePath));
        result.push(applyThemeToPath(path, config.themePath));
    });

    return result;
}

function applyThemeToPath(path, theme) {
    return path.replace('{{themeRoot}}', theme);
}


var srcAbsolutePath = path.resolve(process.cwd(), config.src);

/**
 * For child controller we use the same name in AngularJS as for parent
 * to avoid name conflicts we rename parent controllers
 *
 *    parent: checkoutAccordionController -> _checkoutAccordionController
 *     child: checkoutAccordionController
 */
function resolveControllersNames(file) {
    if (getFileTheme(file) === config.baseName && isController(file)) {
        if (hasChildController(file)) {
            prefixControllerName(file);
        }
    }

    function getFileTheme(file) {
        return path.relative(srcAbsolutePath, file.base);
    }

    function isController(file) {
        var regex = /.*controller.js$/;
        return regex.test(file.path);
    }

    /**
     * child controller filename must be prefixed with '_'
     */
    function hasChildController(file) {
        var pathInTheme = path.relative(file.base, path.dirname(file.path)),
            fileName = path.basename(file.path),
            childControllerPath = path.join(config.themePath, pathInTheme, '_' + fileName),
            matchChildController = glob.sync(childControllerPath);

        return matchChildController.length !== 0;
    }

    function prefixControllerName(file) {
        var regex = /\.controller\(['"]([^'"]+)['"]/;
        var content = file.contents.toString();
        file.contents = new Buffer(content.replace(regex, '.controller(\'_$1\''));
    }
}

