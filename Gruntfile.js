'use strict';

module.exports = function(grunt) {

    const Livereload = 35729;
    const ServeStatic = require('serve-static');

    // directories
    const dst = 'dst';
    const src = 'src';
    const tmp = '.tmp';
    const app = 'app';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        /** 
         * Delete all working directories and contents
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
         * https://github.com/jsoverson/grunt-open
         * Opens the web server in the browser
         */
        open: {
            server: {
                path: `http://localhost:<%= connect.options.port %>/`
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
            scripts_dev: {
                files: [
                ],
                tasks: [
                ],
                options: {
                    livereload: true
                }
            },

            // // STYLE
            // style: {
            //     files: [
            //         `src/css/style.css`
            //     ],
            //     tasks: [
            //         'copy:dev'
            //     ],
            //     options: {
            //         livereload: true
            //     }
            // },
            // // MARKUP
            // markup: {
            //     files: [
            //         `src/index.html`
            //     ],
            //     tasks: [
            //         // 'copy:dev'
            //         'processhtml'
            //     ],
            //     options: {
            //         livereload: true
            //     }
            // }
        }
    });

    grunt.registerTask('default', [
        // LIVE UPDATES / PREVIEW
        'connect:livereload',
        'open',
        'watch'
    ]);
};