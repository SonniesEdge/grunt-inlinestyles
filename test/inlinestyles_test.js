'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.inlinestyles = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  absolutepath_options: function (test) {
    test.expect(2);

    var actualbasic = grunt.file.read('tmp/absolutepath_basic'); // CHANGE TO OUTPUTTED CODE
    var expectedbasic = grunt.file.read('test/expected/page_absolute_path_nohost.html');
    test.equal(actualbasic, expectedbasic, 'CSS linked via absolute path gets inlined, basic grunt import');

    var actualglobbing = grunt.file.read('tmp/absolutepath_globbing'); // CHANGE TO OUTPUTTED CODE
    var expectedglobbing = grunt.file.read('test/expected/page_absolute_path_nohost.html');
    test.equal(actualglobbing, expectedglobbing, 'CSS linked via absolute path gets inlined, globbing grunt import');

    test.done();
  },
  // relativepath_options: function (test) {
  //   test.expect(2);
  //
  //   var actualbasic = grunt.file.read('tmp/relativepath_basic'); // CHANGE TO OUTPUTTED CODE
  //   var expectedbasic = grunt.file.read('test/expected/page_relative_path_nohost.html');
  //   test.equal(actualbasic, expectedbasic, 'CSS linked via relative path gets inlined, basic grunt import');
  //
  //   var actualglobbing = grunt.file.read('tmp/relativepath_globbing'); // CHANGE TO OUTPUTTED CODE
  //   var expectedglobbing = grunt.file.read('test/expected/page_relative_path_nohost.html');
  //   test.equal(actualglobbing, expectedglobbing, 'CSS linked via relative path gets inlined, globbing grunt import');
  //
  //   test.done();
  // },
  // absoluteuri_options: function (test) {
  //   test.expect(2);
  //
  //   var actualbasic = grunt.file.read('tmp/absoluteuri_basic'); // CHANGE TO OUTPUTTED CODE
  //   var expectedbasic = grunt.file.read('test/expected/page_absolute_uri.html');
  //   test.equal(actualbasic, expectedbasic, 'CSS linked via an absolute URI gets inlined, basic grunt import');
  //
  //   var actualglobbing = grunt.file.read('tmp/absoluteuri_globbing'); // CHANGE TO OUTPUTTED CODE
  //   var expectedglobbing = grunt.file.read('test/expected/page_absolute_uri.html');
  //   test.equal(actualglobbing, expectedglobbing, 'CSS linked via an absolute URI gets inlined, globbing grunt import');
  //
  //   test.done();
  // }
};
