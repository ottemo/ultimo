/*jshint node:true */

module.exports = function() {
    var src = './src/',
        temp = './tmp/',
        email = './email/',
        base = 'default',
        theme = 'ultimo';

    var config = {
        // Themes
        baseName: base,
        themeName: theme,

        // Reserved and written to in gulpfile.js
        env: '',
        settings: '',

        /************** Paths ****************/
        src: src,
        basePath: src + base,
        themePath: src + theme,
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

        app: temp + 'config.js',

        /************** Theme related paths ****************/
        fonts: '_fonts/**/*.{otf,svg,eot,ttf,woff,woff2}',
        html: {
            root: '*.html',
            nonRoot: [
                '**/*.html',
                '!*.html',
            ],
        },
        media: [
            '_images/**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
            '**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
            '!_fonts/*',
        ],
        misc: [
            '*.{htaccess,ico,xml}',
            'humans.txt',
        ],
        robots: {
            default: 'robots.dev.txt',
            prod: 'robots.prod.txt',
        },
        styles: {
            root: 'app.scss',
            all: [
                '**/*.scss',
                '**/*.css',
            ],
        },
        scripts: {
            app: [
                '**/init.js',
                '**/_init.js',
                '**/*.js',
                '!_lib/**/*', // don't clobber lib
            ],
            lib: [
                '_lib/jquery.min.js',
                '_lib/angular.min.js',
                '_lib/**/*.min.js',
            ],
        },

        /************** Settings ****************/
        node: {
            port: '8080',
        },
        sassSettings: {
            // Seems to break sourcemaps, so conditionally minify css in gulpfile
            // outputStyle: 'compressed',
            precision: 8,
            // Search imported styles in theme at first and then in base
            includePaths: [src + theme + '/', src + base + '/']
        },
        uglifySettings: {
            mangle: false,
        },
    };

    return config;
};

