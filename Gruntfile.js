/*
 * grunt-inlinestyles
 *
 *
 * Copyright (c) 2014
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },
    // Configuration to be run (and then tested).
    inlinestyles: {
      absolutepath_basic: {
        options: {
        },
        files: {
          'tmp/absolutepath_basic': 'test/fixtures/page_absolute_path_nohost.html'
        }
      },

      absolutepath_globbing: {
        options: {
        },
        files: {
          'tmp/absolutepath_globbing': 'test/fixtures/page_absolute_path_nohost.html'
        }
      },

      relativepath_basic: {
        options: {
        },
        files: {
          'tmp/relativepath_basic': 'test/fixtures/page_relative_path_nohost.html'
        }
      },

      relativepath_globbing: {
        options: {
        },
        files: {
          'tmp/relativepath_globbing': 'test/fixtures/page_relative_path_nohost.html'
        }
      },


      absoluteuri_basic: {
        options: {
        },
        files: {
          'tmp/absoluteuri_basic': 'test/fixtures/page_absolute_uri_nohost.html'
        }
      },

      absoluteuri_globbing: {
        options: {
        },
        files: {
          'tmp/absoluteuri_globbing': 'test/fixtures/page_absolute_uri_nohost.html'
        }
      }


    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'inlinestyles', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
