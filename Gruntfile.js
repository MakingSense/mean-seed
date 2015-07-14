'use strict';

// TODO: create a task for UI development to improve their process.
// TODO: use concurrent where it fits.

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-usemin');
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
            images: './public/images',
            lib: './public/lib',
            modules: './public/modules',
            styles: './public/styles',
            test: './test'
        },

        /**
         * Cleans up "dist" directory before building.
         * Relies on: grunt-contrib-clean.
         */
        clean: {
            dist: {
                src: ['<%= paths.dist %>']
            }
        },

        /**
         * Copies static files to "dist" directory. Used for building purposes.
         * Relies on: grunt-contrib-copy.
         */
        copy: {
            dist: {
                files: [
                    { expand: true, cwd: '<%= paths.images %>/', src: ['**'], dest: '<%= paths.dist %>/images/' },
                    { expand: true, cwd: '<%= paths.modules %>/', src: ['**/views/**/*'], dest: '<%= paths.dist %>/modules/' },
                    { src: '<%= paths.app %>/.htaccess', dest: '<%= paths.dist %>/.htaccess' },
                    { src: '<%= paths.app %>/favicon.ico', dest: '<%= paths.dist %>/favicon.ico' },
                    { src: '<%= paths.app %>/index.html', dest: '<%= paths.dist %>/index.html' },
                    { src: '<%= paths.app %>/robots.txt', dest: '<%= paths.dist %>/robots.txt' }
                ]
            }
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
            dist: {
                options: {
                    mangle: false,
                    sourceMap: false,
                    compress: {
                        drop_console: true // jshint ignore:line
                    }
                },
                files: {
                    '<%= paths.dist %>/scripts/lib.js': ['<%= paths.dist %>/scripts/lib.js'],
                    '<%= paths.dist %>/scripts/app.js': ['<%= paths.dist %>/scripts/app.js']
                }
            }
        },

        /**
         * Updates the grunt configuration to apply a configured transformation flow to tagged files.
         * Relies on: grunt-usemin.
         */
        useminPrepare: {
            html: '<%= paths.dist %>/index.html',
            options: {
                dest: '<%= paths.dist %>'
            }
        },

        /**
         * First it replaces all the blocks with a single "summary" line, pointing to a file creating by the transformation flow.
         * Then it looks for references to assets (i.e. images, scripts, ...), and tries to replace them.
         * Relies on: grunt-usemin.
         */
        usemin: {
            html: ['<%= paths.dist %>/index.html'],
            options: {
                dirs: ['<%= paths.dist %>']
            }
        },

        /**
         * Concatenates several files into a single one.
         * Relies on: grunt-contrib-concat.
         */
        concat: {
            styles: {
                files: [
                    {
                        dest: '<%= paths.dist %>/styles/main.css',
                        src: '<%= paths.styles %>/main.css'
                    }
                ]
            },
            scripts: {
                files: [
                    {
                        dest: '<%= paths.dist %>/scripts/lib.js',
                        src: [
                            '<%= paths.lib %>/jquery/jquery.min.js',
                            '<%= paths.lib %>/angular/angular.min.js',
                            '<%= paths.lib %>/angular-resource/angular-resource.js',
                            '<%= paths.lib %>/angular-cookies/angular-cookies.js',
                            '<%= paths.lib %>/ngstorage/ngStorage.min.js',
                            '<%= paths.lib %>/angular-sanitize/angular-sanitize.js',
                            '<%= paths.lib %>/angular-route/angular-route.js',
                            '<%= paths.lib %>/angular-http-auth/src/http-auth-interceptor.js',
                            '<%= paths.lib %>/autofill-directive/autofill-directive.js',
                            '<%= paths.lib %>/underscore/underscore-min.js'
                        ]
                    },
                    {
                        dest: '<%= paths.dist %>/scripts/app.js',
                        src: ['<%= paths.modules %>/**/*.js']
                    }
                ]
            }
        },

        /**
         * Starts up the server on a predefined port.
         * Relies on: grunt-express-server.
         */
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: '<%= paths.root %>/server.js'
                }
            },
            prod: {
                options: {
                    script: '<%= paths.root %>/server.js',
                    node_env: 'production' // jshint ignore:line
                }
            }
        },

        /**
         * Opens the project in a new tab of your browser.
         * Relies on: grunt-open.
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
                    '<%= paths.styles %>/main.css': '<%= paths.styles %>/main.scss'
                }
            }
        },

        /**
         * Adds the vendor prefix for styles.
         * Relies on: grunt-autoprefixer.
         */
        autoprefixer: {
            options: {
                map: true
            },
            css: {
                expand: true,
                flatten: true,
                src: '<%= paths.styles %>/*.css',
                dest: '<%= paths.styles %>/'
            }
        },

        /**
         * Test runner on the front-end side.
         * Relies on: grunt-karma.
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
        mocha_istanbul: { // jshint ignore:line
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
        'sass',
        'autoprefixer',
        'open',
        'watch'
    ]);

    /**
     * Builds the application and generates a bundle in "dist" folder.
     */
    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist',
        'useminPrepare',
        'concat:scripts',
        'uglify:dist',
        'sass',
        'autoprefixer',
        'concat:styles',
        'usemin'
    ]);

    /**
     * A task to simulate production environment.
     */
    grunt.registerTask('production', [
        'build',
        'express:prod',
        'open',
        'watch'
    ]);

    /**
     * Ensures the code is tested, valid & beautiful.
     * TODO: if one task fails stops the execution of the remaining tasks. Find a way to execute all tasks besides the result of a single one.
     */
    grunt.registerTask('validate', [
        'jshint',
        'karma:unit',
        'mochaTest'
    ]);

    /**
     * End to end tests running. Protractor requires express to be up & running
     */
    grunt.registerTask('e2e', [
        'express:dev',
        'protractor'
    ]);

    /**
     * With this one we could know the current tests coverage.
     */
    grunt.registerTask('coverage', [
        'mocha_istanbul:coverage'
    ]);
};
