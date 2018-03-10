'use strict';

module.exports = function(grunt) {

    const Livereload = 35729;
    const ServeStatic = require('serve-static');

    const dst = 'dst';
    const src = 'src';
    const tmp = '.tmp';
    const app = 'app';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        /** 
         */
        clean: {
            build: {
                src: [
                    `${app}`,
                    `${dst}`,
                    `${tmp}`
                ]
            }
        },


        /**
         *
         */
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: `${src}/`,
                    src: ['**'],
                    dest: `${app}/`,
                    filter: 'isFile'
                }]
            }
        },



        /**
         * https://github.com/jsoverson/grunt-open
         * Opens the web server in the browser
         */
        open: {
            server: {
                path: `http://localhost:<%= connect.options.port %>/`
            }
        },


        /**
         *  https://www.npmjs.com/package/grunt-processhtml
         *  process <!-- build:include --> directives
         */
        processhtml: {
            dev: {
                options: {
                    process: true
                    // data: config,
                    // strip: true,
                },
                files: [{
                    src: `${app}/chapters/00/index.html`,
                    dest: `${app}/chapters/00/index.html`
                }]
            }
        },


        /**
         * Connect port/livereload
         * https://github.com/gruntjs/grunt-contrib-connect
         */
        connect: {
            options: {
                port: 9000,
                hostname: '*'
            },
            livereload: {
                options: {
                    middleware: function(connect, options) {
                        return [
                            ServeStatic(`${app}`),
                            connect().use(`${app}`, ServeStatic(`${app}`)),
                            ServeStatic(`${app}`)
                        ]
                    }
                }
            }
        },


        /**
         * https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            options: {
                spawn: true,
                livereload: true
            },
            all: {
                files: [
                    `${src}/**/*.*`
                ],
                tasks: [
                    'copy',
                    'processhtml'
                ],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('default', [
        
        'copy',
        'processhtml',

        // LIVE UPDATES / PREVIEW
        'connect:livereload',
        'open',
        'watch'
    ]);
};