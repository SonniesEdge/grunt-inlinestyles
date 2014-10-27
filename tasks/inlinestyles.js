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


  grunt.registerMultiTask('inlinestyles', 'Inline CSS files into a HTML file', function () {

    // Default options
    var options = this.options({
      basepath: process.cwd(),
      minify: true,
      tag: '[data-inline="true"]'
    });



    // FOR EACH FILE SPECIFIED...
    // Iterate over all specified file groups.
    this.files.forEach(function (file) {

      // Don't process an empty or nonexistant file
      if(file.src.length === 0) { return; }

      // Assign source file to Cheerio object, so we can do jQuery-like manipulations
      var $ = cheerio.load(grunt.file.read(file.src));

      // Loop through every CSS link in HTML
      // TODO: Change this so that only marked links are processed
      // TODO: Make this work with non-HTML templates, that might not have full DOM
      $('link[rel="stylesheet"]'+options.tag).each(function () {
        var csscontent;
        var cssdomain;
        var csspath;
        var csscontents;
        var csslinktype;
        var csslinksubtype;
        var cssbasepath;



        // RETRIEVE LINK TO CSS FROM HTML

        // Get href
        var hrefinfo = $(this).attr('href');

        // Parse domain
        cssdomain = url.parse(hrefinfo).hostname;

        // Parse path
        csspath = url.parse(hrefinfo).pathname;




        // DETERMINE IF LINK IS TO A URI OR A LOCAL PATH
        /*
        Formats could be one of:

        URI
        http://example.com/path/1/2/3/main.css
        https://example.com/path/1/2/3/main.css
        //example.com/path/1/2/3/main.css

        PATH
        /path/1/2/3/main.css
        ./path/1/2/3/main.css
        ../1/2/3/main.css
        */
        if (
          csspath.substr(0, 7) === 'http://' ||   /* HTTP*/
          csspath.substr(0, 8) === 'https://' ||  /* HTTPS*/
          csspath.substr(0, 2) === '//'           /* Protocol relative */
          ){
          csslinktype = 'uri';
        } else {
          csslinktype = 'path';
          // Determine if path is relative or absolute
          if (csspath.substr(0, 1) !== '/') {
            csslinksubtype = 'relative';
          } else {
            csslinksubtype = 'absolute';
          }
        } // TODO: This feels flaky. Is there a better way to do this?



        // SCENARIO 1: Path
        // CSS is specified locally
        if (csslinktype === 'path') {

          // If link is absolute, determine full system path
          if (csslinksubtype === 'absolute') {
            // If basepath supplied, append to start of csspath
            if (options.basepath) {
              // Basepath should be relative to Grunt's process.cwd
              cssbasepath = path.resolve(options.basepath);
              csspath = path.join(cssbasepath + csspath);
            }
          }

          // If link is relative then must resolve CSS file relative to file.src
          if (csslinksubtype === 'relative') {
            // Get current HTML directory
            var htmlpath = path.dirname(file.src);
            htmlpath = path.resolve(htmlpath);

            // combine together with magic
            csspath = path.resolve(htmlpath, csspath);
          }

          //Read file contents
          csscontents = grunt.file.read(csspath);
        }





        // SCENARIO 2: URI
        // CSS is specified remotely
        if (csslinktype === 'uri') {
          // If remotedomain supplied, append to start of path
          if (options.basedomain) {
            grunt.log.writeln('remote domain supplied');
          }


          // FOR NOW JUST ISSUE WARNING AND SKIP
          grunt.fail.warn('URIs are currently not supported');

          // Get contents of CSS file
          // If contentpath is a URL, load remotely
        }






        // MINIFY CSS
        // Minify by default, because this is all about performance, innit?
        if (options.minify) {
          csscontents = cleanCSS().minify(csscontents);
        }

        // GENERATE INLINE CONTENT
        if (options.minify) {
          $(this).replaceWith('<style>' + csscontents + '</style>');
        } else {
          $(this).replaceWith('<style>' + grunt.util.linefeed + csscontents + grunt.util.linefeed + '</style>');
        }

        // DEBUG
        // grunt.log.writeln('Domain: ' + cssdomain);
        // grunt.log.writeln('CSS path: ' + csspath);
        // grunt.log.writeln('CSS contents:');
        // grunt.log.writeln(csscontents);

      }); // end foreach link


      // WRITE NEW INLINE CONTENT TO FILE
      grunt.log.writeln('Inlining ' + path.resolve(file.dest));
      grunt.file.write(path.resolve(file.dest), $.html());


    }); // end foreach file





  });

};
