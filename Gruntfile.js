'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.initConfig({
        yeoman: {
            // configurable paths
            app: require('./bower.json').publicPath || 'public'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'test/frontend-unit-tests/karma.conf.js',
                singleRun: true
            }
        },
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {
            express: {
                files: [
                    'server.js',
                    'api/**/*.{js,json}'
                ],
                tasks: ['express:dev'],
                options: {
                    livereload: true,
                    nospawn: true //Without this option specified express won't be reloaded
                }
            },
            css: {
                files: 'public/assets/scss/*.scss',
                tasks: ['sass']
            },
            livereload: {
                options: {
                    livereload: { livereload: true }
                },
                files: [
                    '<%= yeoman.app %>{,*/}*.html',
                    '<%= yeoman.app %>/modules/**/**/{,*/}*.html',
                    '<%= yeoman.app %>/modules/**/**/{,*/}*.js',
                    '<%= yeoman.app %>/assets/scss/{,*/}*.scss'
                ]
            }
        },
        concurrent: {
            test: ['sass', 'jshint', 'karma', 'mochaTest']
        },
        sass: {
            dist: {
                options: {
                    includePaths: ['public/assets/scss/'],
                    outputStyle: 'nested'
                },
                files: {
                    'public/assets/css/main.css': 'public/assets/scss/main.scss'
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    // Including it here makes the app-module-path magic work as expected
                    require: 'test/backend-unit-tests/spec/server-test.js'
                },
                src: ['test/backend-unit-tests/spec/**/*.js']
            }
        },
        protractor: {
            options: {
                configFile: 'test/e2e-tests/protractor.conf.js',
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            all: { } // Grunt requires at least one target
        },
        mocha_istanbul: {
            coverage: {
                options: {
                    reporter: 'spec',
                    // Including it here makes the app-module-path magic work as expected
                    require: 'test/backend-unit-tests/spec/server-test.js'
                },
                src: ['test/backend-unit-tests/spec/**/*.js']
            }
        }
    });

    grunt.registerTask('dev', [
        'express:dev',
        'open',
        'watch'
    ]);

    grunt.registerTask('ui-dev', [
        'sass',
        'express:dev',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'concurrent:test'
    ]);

    // TODO: define this task
    grunt.registerTask('default', [
    ]);

    grunt.registerTask('e2e-tests', [
        'express:dev',
        'open',
        'protractor'
    ]);

    grunt.registerTask('coverage',[
        'mocha_istanbul:coverage'
    ]);
};
