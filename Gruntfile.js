/*
 * grunt-dom-munger
 * https://github.com/cgross/grunt-dom-munger
 *
 * Copyright (c) 2013 Chris Gross
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    cheeriotester: {
        success: {
            files: [
              'tests/success.html'
            ]
        },
        fail: {
            files: [
              'tests/fail.html'
            ]
        }

    }
  });
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.registerTask('success', ['cheeriotester:success']);
  grunt.registerTask('fail', ['cheeriotester:fail']);
};
