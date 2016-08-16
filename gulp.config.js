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
        fonts: '{{themeRoot}}/_fonts/**/*.{otf,svg,eot,ttf,woff,woff2}',
        html: {
            root: '{{themeRoot}}/*.html',
            nonRoot: [
                '{{themeRoot}}/**/*.html',
                '!{{themeRoot}}/*.html',
            ],
        },
        media: [
            '{{themeRoot}}/_images/**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
            '{{themeRoot}}/**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
            '!{{themeRoot}}/_fonts/*',
        ],
        misc: [
            '{{themeRoot}}/*.{htaccess,ico,xml}',
            '{{themeRoot}}/humans.txt',
        ],
        robots: {
            default: '{{themeRoot}}/robots.dev.txt',
            prod: '{{themeRoot}}/robots.prod.txt',
        },
        styles: {
            root: '{{themeRoot}}/app.scss',
            all: [
                '{{themeRoot}}/**/*.scss',
                '{{themeRoot}}/**/*.css',
            ],
        },
        scripts: {
            app: [
                '{{themeRoot}}/**/init.js',
                '{{themeRoot}}/**/_init.js',
                '{{themeRoot}}/**/*.js',
                '!{{themeRoot}}/_lib/**/*', // don't clobber lib
            ],
            lib: [
                '{{themeRoot}}/_lib/jquery.min.js',
                '{{themeRoot}}/_lib/angular.min.js',
                '{{themeRoot}}/_lib/**/*.min.js',
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

