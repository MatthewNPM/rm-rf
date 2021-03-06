// Coding standard for this project defined @ https://github.com/MatthewSH/standards/blob/master/JavaScript.md
'use strict';

const $glob = require('glob');
const $loop = require('parallel-loop');
const $rr   = require('rimraf');

exports = module.exports = function rmRf (_pattern, _options, _callback) {
  var options = {};
  if (typeof _callback === 'undefined') {
    _callback = _options;
  } else {
    options = _options;
  }

  glob(_pattern, options, function globCallback (error, filenames) {
    if (error) {
      return _callback(error);
    }
    loop(filenames.length, each, _callback);
    function each (done, i) {
      $rr(filenames[i], done);
    }
  });
};
