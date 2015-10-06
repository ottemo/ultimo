module.exports = function() {

    var src = './src/';
    var app = src + 'app/';
    var temp = './tmp/';

    var config = {
        // Paths
        build: 'dist/',
        html: {
            all: app + '**/*.html',
            root: app + '*.html'
        },
        misc: app + '*.{htaccess,ico,xml}',
        robots: {
            default: app + 'robots.dev.txt',
            prod: app + 'robots.prod.txt'
        },
        styles: {
            root: app + 'app.scss',
            all: [
                app + '**/*.scss',
                app + '**/*.css'
            ]
        },
        media: [
            // Ignore media, declaring the _images folder directly moves all of its contents
            // without the container folder getting in the way
            '!' + app + '_fonts/*',
            app + '_images/**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
            app + '**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
        ],
        fonts: app + '_fonts/**/*.{svg,eot,ttf,woff,woff2}',
        scripts: {
            app: [
                '!' + app + '_lib/**/*', // don't clobber lib
                app + 'config.js',
                app + 'main.js',
                app + '**/init.js',
                app + '**/*.js'
            ],
            lib: [
                '!' + app + '_lib/ie/**/*', // be careful not to clobber ie
                app + '_lib/jquery.min.js',
                app + '_lib/angular.min.js',
                app + '_lib/**/*.min.js'
            ],
            ie: app + '_lib/ie/*.min.js'
        },

        // Settings
        sassSettings: {
            outputStyle: 'compressed',
            precision: 8,
        },

        node: {
            port: '8080',
            lrPort: '35729' // not used?
        }
    };

    return config;
}

