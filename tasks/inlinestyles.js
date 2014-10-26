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
  var fs = require('fs');
  var cleanCSS = require('clean-css');


  grunt.registerMultiTask('inlinestyles', 'The best Grunt plugin ever.', function () {

    var options = this.options({
      basepath: process.cwd(),
      cssDir: "",
      minify: false
    });

// grunt.log.writeln(JSON.stringify(options));

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
        var csslinktype;
        var csslinksubtype;
        var cssbasepath;

        // Get href
        var hrefinfo = $(this).attr('href');

        // Parse domain
        cssdomain = url.parse(hrefinfo).hostname;

        // Parse path
        csspath = url.parse(hrefinfo).pathname;




        // Determine if initial csspath is relative or absolute
        // TODO: how to handle relative paths? path.normalize?

        /*
        format could be:

        URI
        http://example.com/path/1/2/3/main.css
        https://example.com/path/1/2/3/main.css
        //example.com/path/1/2/3/main.css

        PATH
        /path/1/2/3/main.css
        ./path/1/2/3/main.css
        ../1/2/3/main.css
        */


        // Is it a URI or a path?
        if (csspath.substr(0, 7) === 'http://' || csspath.substr(0, 8) === 'https://' || csspath.substr(0, 2) === '//') {
          csslinktype = 'uri';
        } else {
          csslinktype = 'path';
          if (csspath.substr(0, 1) !== '/') {
            csslinksubtype = 'relative';
          } else {
            csslinksubtype = 'absolute';
          }
        }


        // If basepath supplied, append to start of csspath
        if (options.basepath) {

          // Basepath should be relative to cwd
          cssbasepath = path.resolve(options.basepath);

          grunt.log.writeln('CSS base path: ' + cssbasepath);

          grunt.log.writeln('base path supplied');
          if (csslinksubtype === 'absolute') {
            grunt.log.writeln('absolute path');
            csspath = path.join(cssbasepath + csspath);
            // csspath = path.normalize(csspath);
          }
        }

        // If remotedomain supplied, append to start of path
        if (options.basedomain) {
          grunt.log.writeln('remote domain supplied');
        }

        // If basedomain == cssdomain, then treat as filesystem path


        // Get contents of CSS file
          // If contentpath is a URL, suck via something

          // if contentpath is a filepath, grab via normal stuff
          // csscontents = fs.readFile(csspath);
          grunt.log.writeln('outside function');

          csscontents = grunt.file.read(csspath);



        // Minify CSS
        csscontents = cleanCSS().minify(csscontents);


        // Generate new inline contents
          // <style></style>

        grunt.log.writeln('Domain: ' + cssdomain);
        grunt.log.writeln('CSS path: ' + csspath);
        grunt.log.writeln('CSS contents:');
        grunt.log.writeln(csscontents);

        $(this).replaceWith('<style>' + csscontents + '</style>');
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
