/*jshint node:true */

module.exports = function() {

    var src = './src/';
    var app = src + 'app/';
    var email = src +'email/';

    var temp = './tmp/';

    var config = {
        // Reserved and written to in gulpfile.js
        env: '',
        settings: '',

        /************** Paths ****************/
        build: 'dist/',

        // App
        fonts: app + '_fonts/**/*.{svg,eot,ttf,woff,woff2}',
        html: {
            root: app + '*.html',
            nonRoot: [
                '!' + email + '**/*',
                '!' + app + '*.html',
                app + '**/*.html',
            ],
        },
        media: [
            // Ignore media, declaring the _images folder directly moves all of its contents
            // without the container folder getting in the way
            '!' + app + '_fonts/*',
            app + '_images/**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
            app + '**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
        ],
        misc: app + '*.{htaccess,ico,xml}',
        robots: {
            default: app + 'robots.dev.txt',
            prod: app + 'robots.prod.txt',
        },
        styles: {
            root: app + 'app.scss',
            all: [
                app + '**/*.scss',
                app + '**/*.css',
            ],
        },
        scripts: {
            app: [
                '!' + app + '_lib/**/*', // don't clobber lib
                temp + 'config.js', // this is a built file
                app + '**/init.js',
                app + '**/*.js',
            ],
            lib: [
                app + '_lib/jquery.min.js',
                app + '_lib/angular.min.js',
                app + '_lib/**/*.min.js',
            ],
        },

        // Emails
        email: [
            // Build files are saved as .inline.html
            '!' + email + '**/*.inline.html',
            email + '**/*.html',
        ],

        // Temp
        temp: temp,

        /************** Settings ****************/
        node: {
            port: '8080',
            lrPort: '35729', // not used?
        },
        sassSettings: {
            // Seems to break sourcemaps, so conditionally minify css in gulpfile
            // outputStyle: 'compressed',
            precision: 8,
        },
        uglifySettings: {
            mangle: false,
        },
    };

    return config;
};

