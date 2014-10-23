/*
 * grunt-inlinestyles
 *
 *
 * Copyright (c) 2014
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks


  // Load helper modules
  var path = require('path');
  var cheerio = require('cheerio');
  var url = require('url');


  grunt.registerMultiTask('inlinestyles', 'The best Grunt plugin ever.', function () {

    var options = this.options({
      jsDir: "",
      cssDir: "",
      minify: false
    });

grunt.log.writeln(JSON.stringify(options));

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {

      // Don't process an empty or nonexistant file
      if(file.src.length === 0) { return; }

      // Assign source file to Cheerio object,  so we can do jQuery-like manipulations
      var $ = cheerio.load(grunt.file.read(file.src));

      // Loop through every CSS link in header
      // TODO: Change this so that only marked links are processed
      $('link[rel="stylesheet"]').each(function () {
        var csscontent;
        var cssdomain;
        var csspath;
        var csscontents;

        // Get href
        var hrefinfo = $(this).attr('href');

        // Parse domain
        cssdomain = url.parse(hrefinfo).hostname;

        // Parse path
        csspath = url.parse(hrefinfo).pathname;

        grunt.log.writeln(cssdomain);
        grunt.log.writeln(csspath);


        // Determine if initial csspath is relative or absolute
        // TODO: how to handle relative paths? path.normalize?


        // If basepath supplied, append to start of csspath
        if (options.basepath) {
          grunt.log.writeln('base path supplied');
        }

        // If remotedomain supplied, append to start of path
        if (options.basedomain) {
          grunt.log.writeln('remote domain supplied');
        }

        // If basedomain == cssdomain, then treat as filesystem path


        // Get contents of CSS file
          // If contentpath is a URL, suck via something

          // if contentpath is a filepath, grab via normal stuff


        // Generate new inline contents
          // <style></style>



        $(this).replaceWith('<style>\n' + csscontents + '\n</style>');
      }); // end foreach link

      // what are the filenams being supplied?
      // single file?
      // single src+dest?
      // array of single files
      // array of src+dest


      // Write all inline styles back to file
      grunt.file.write(path.resolve(file.dest), $.html());



    }); // end foreach file





  });

};
