'use strict';

var webpack = require('webpack');
var MemoryFileSystem = require('memory-fs');

var outputFileSystem = new MemoryFileSystem();

/**
 * Basic in memory compiler, promisified
 * @param testConfig - the plugin config being tested run through the webpack compiler
 * @return {Promise} - rejects with both stats and the error if needed
 */
module.exports = function pack(testConfig) {
  return new Promise(function (resolve, reject) {
    var compiler = webpack(testConfig);
    compiler.outputFileSystem = outputFileSystem;
    compiler.run(function (err, stats) {
      if (err) {
        return reject({err: err, stats: stats});
      }
      return resolve(stats);
    });
  });
};
