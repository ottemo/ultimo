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
        styles: app + 'app.scss',
        media: [
            '!' + app + '_fonts/*',
            app + '_images/**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
            app + '**/*.{png,gif,jpg,jpeg,ico,svg,mp4,ogv,webm,pdf}',
        ],
        fonts: app + '_fonts/**/*.{svg,eot,ttf,woff,woff2}',
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
        },

        // Settings
        sassSettings: {
            outputStyle: 'compressed',
            precision: 8,
        },

        node: {
            port: '8080',
            lrPort: '35729'
        }
    };

    return config;
}

