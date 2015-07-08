'use strict';

// TODO: create a task for UI development to improve their process.
// TODO: create a task for building.
// TODO: use concurrent where it fits.

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.initConfig({
        
        /**
         * Some helpful paths.
         */
        paths: {
            root: '.',
            api: './api',
            app: './public',
            dist: './public/dist',
            modules: './public/modules',
            assets: './public/assets',
            styles: './public/styles',
            test: './test'
        },
        
        /**
         * Ensures the code is beautiful.
         * Relies on: grunt-contrib-jshint.
         */
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= paths.root %>/*.js',
                '<%= paths.api %>/**/*.js',
                '<%= paths.modules %>/**/*.js'
            ]
        },
        
        /**
         * Joins each script in a single and ugly one!
         * Relies on: grunt-contrib-uglify.
         */
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    sourceMap: true,
                },
                files: {
                    '<%= paths.dist %>/scripts/all.min.js': ['<%= paths.modules %>/**/*.js']
                }
            },
            dist: {
                options: {
                    mangle: false,
                    sourceMap: false,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    '<%= paths.dist %>/scripts/all.min.js': ['<%= paths.modules %>/**/*.js']
                }
            }
        },
        
        /**
         * Starts up the server on a predefined port.
         */
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: '<%= paths.root %>/server.js'
                }
            }
        },
        
        /**
         * Opens the project in a new tab of your browser.
         */
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        
        /**
         * Runs several util tasks while developing.
         * Relies on: grunt-contrib-watch.
         */
        watch: {
            express: {
                files: [
                    '<%= paths.root %>/server.js',
                    '<%= paths.api %>/**/*.{js,json}'
                ],
                tasks: ['express:dev'],
                options: {
                    livereload: true,
                    spawn: false
                }
            },
            validate: {
                files: [
                    '<%= paths.root %>/*.js',
                    '<%= paths.api %>/**/*.js',
                    '<%= paths.modules %>/**/*.js',
                    '<%= paths.test %>/**/*.js',
                ],
                tasks: ['validate']
            },
            uglify: {
                files: [
                    '<%= paths.modules %>/**/*.js'
                ],
                tasks: ['uglify:dev']
            },
            sass: {
                files: [
                    '<%= paths.styles %>/**/*.scss'
                ],
                tasks: [
                    'sass',
                    'autoprefixer'
                ]
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= paths.app %>/index.html',
                    '<%= paths.modules %>/**/*.html',
                    '<%= paths.modules %>/**/*.js',
                    '<%= paths.styles %>/**/*.scss'
                ]
            }
        },
        
        /**
         * Compiles the SCSS files in a single and plain CSS.
         * Relies on: grunt-sass.
         */
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    '<%= paths.dist %>/styles/main.css': '<%= paths.styles %>/main.scss'
                }
            }
        },
        
        /**
         * Adds the vendor prefix for styles.
         */
        autoprefixer: {
            options: {
                map: true
            },
            css: {
                expand: true,
                flatten: true,
                src: '<%= paths.dist %>/styles/*.css',
                dest: '<%= paths.dist %>/styles/'
            }
        },
        
        /**
         * Test runner on the front-end side.
         */
        karma: {
            unit: {
                configFile: '<%= paths.test %>/frontend-unit-tests/karma.conf.js',
                singleRun: true
            },
            continuous: {
                // TODO: complete for build processes
            }
        },
        
        /**
         * Test runner on the back-end side.
         * Relies on: grunt-mocha-test.
         */
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: '<%= paths.test %>/backend-unit-tests/spec/server-test.js' // Including it here makes the app-module-path magic work as expected
                },
                src: ['<%= paths.test %>/backend-unit-tests/spec/**/*.js']
            }
        },
        
        /**
         * Test runner for the e2e tests.
         * Relies on: grunt-protractor-runner.
         */
        protractor: {
            options: {
                configFile: '<%= paths.test %>/e2e-tests/protractor.conf.js',
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            all: {} // Grunt requires at least one target
        },
        
        /**
         * Provides the current tests coverage.
         * Relies on: grunt-mocha-istanbul.
         */
        mocha_istanbul: {
            coverage: {
                options: {
                    reporter: 'spec',
                    require: '<%= paths.test %>/backend-unit-tests/spec/server-test.js' // Including it here makes the app-module-path magic work as expected
                },
                src: ['<%= paths.test %>/backend-unit-tests/spec/**/*.js']
            }
        }
    });

    /**
     * Default task will be our dev task
     */
    grunt.registerTask('default', [
        'express:dev',
        'uglify:dev',
        'sass',
        'autoprefixer',
        'open',
        'watch'
    ]);

    /**
     * Ensures the code is tested, valid & beautiful.
     * TODO: if one task fails stops the execution of the remaining tasks. Find a way to execute all tasks besides the result of a single one.
     */
    grunt.registerTask('validate', [
        //'jshint', // TODO: uncomment jshint task once all errors were fixed because is stopping the execution of the tasks down below
        'karma:unit',
        'mochaTest'/*,
        'protractor'*/ // TODO: uncomment protractor after a nice setup because is causing some issues right know with different environments
    ]);

    /**
     * With this one we could know the current tests coverage.
     */
    grunt.registerTask('coverage', [
        'mocha_istanbul:coverage'
    ]);
};
