// Generated on 2013-11-14 using generator-angular-fullstack 0.2.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

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
    }

  });


  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('build', [
    'bower'
  ]);

  grunt.registerTask('default', [
  //  'jshint',
    'test',
    'build'
  ]);
};
