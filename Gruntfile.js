'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: require('./bower.json').publicPath || 'public'
    },
    bower: {
        install: {
              //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
        }
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
        configFile: 'test/karma.conf.js',
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
                  'api/{,*//*}*.{js,json}'
              ],
              tasks: ['express:dev'],
              options: {
                  livereload: true,
                  nospawn: true //Without this option specified express won't be reloaded
              }
          },
          livereload: {
              options: {
                  livereload: { livereload: true }
              },
              files: [
                  '<%= yeoman.app %>{,*/}*.html',
                  '<%= yeoman.app %>/modules/**/**/{,*/}*.html',
                  '<%= yeoman.app %>/modules/**/**/{,*/}*.js',
                  '<%= yeoman.app %>/styles/{,*/}*.css'
              ]
          },
          styles: {
            // Which files to watch (all .less files recursively in the less directory)
            files: ['<%= yeoman.app %>/assets/less/*.less'],
            tasks: ['less'],
            options: {
              nospawn: true
            }
          }
      },
      less: {
        development: {
          options: {
            compress: true,
            yuicompress: true,
            optimization: 2
          },
          files: {
            "<%= yeoman.app %>/assets/styles/main.css": "<%= yeoman.app %>/assets/less/main.less"
          }
        }
      }

  });
  

  grunt.registerTask('server', [
  //  'jshint',
   'bower',
   'express:dev',
   'open',
   'watch'
  ]);

  grunt.registerTask('test', [
     //  'jshint',
    'bower',
    'karma'
  ]);

  grunt.registerTask('heroku:production', [
    'bower'
  ]);

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    //  'jshint',
    'bower'
  ]);

};
