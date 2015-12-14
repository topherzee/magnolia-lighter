/*
Next: Have to create a GULP MODULE or a function. called mergejson.
It takes the pipe - and an additional file (or json object) and applies it.
Based on https://github.com/joshswan/gulp-merge-json
https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md

https://github.com/crissdev/gulp-yaml/blob/master/index.js
*/

//var through = require('through2');    // npm install --save through2
'use strict';

var gutil = require('gulp-util');
var merge = require('deepmerge');
// var path = require('path');
var through = require('through2');
var util = require('util');

var PLUGIN_NAME = 'gulp-merge-json-individual';

module.exports = function(startObj, endObj) {
  if ((startObj && typeof startObj !== 'object') || (endObj && typeof endObj !== 'object')) {
    throw new gutil.PluginError(PLUGIN_NAME, PLUGIN_NAME + ': Invalid start and/or end object!');
  }

  // var editFunc;
  //
  // if (typeof edit === 'function') {
  //   editFunc = edit;
  // } else if (typeof edit === 'object') {
  //   editFunc = function(json) { return merge(json, edit); };
  // } else {
  //   editFunc = function(json) { return json; };
  // }


  var firstFile = null;

  function logObject(name,obj){
    console.log(name + ":" + util.inspect(obj, {showHidden: false, depth: null}));
  }

  return through.obj(function(file, enc, callback) {

    if (file.isStream()) {
      return this.emit('error', new gutil.PluginError(PLUGIN_NAME, PLUGIN_NAME + ': Streaming not supported!'));
    }

    if (file.isBuffer()) {

      if (file.contents.length === 0) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'File ' + file.path +
            ' is empty. YAML loader cannot load empty content'));
        return callback();
      }

      if (!firstFile) {
        firstFile = file;
      }

      try {
        //merged = merge(merged, editFunc(JSON.parse(file.contents.toString('utf8'))));
        var fileObj = JSON.parse(file.contents.toString('utf8'));
        //logObject("fileObj", fileObj);

        var merged = startObj || {};
        //logObject("startObj", merged);

        merged = merge(merged, fileObj);
        //logObject("merged with start", merged);

        if (endObj) {
          merged = merge(merged, endObj);
          //logObject("merged with end", merged);
        }

        var mergedBuffer = new Buffer(JSON.stringify(merged, null, '  '),'utf8');
        //console.log("Buffer lenght:" + mergedBuffer.length);
        ///console.log("Buffer string:" + mergedBuffer.toString('utf-8'));

        file.contents = mergedBuffer;

      } catch (err) {
       return this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
      }

      this.push(file);
      callback();

    }



  });
};
