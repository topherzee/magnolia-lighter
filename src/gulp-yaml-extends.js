/*
Looks for the EXTENDS in the JSON.
Where if finds it - it merges the objects.

Based on https://github.com/joshswan/gulp-merge-json
https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
https://github.com/crissdev/gulp-yaml/blob/master/index.js
*/

'use strict';

var gutil = require('gulp-util');
var merge = require('deepmerge');
// var path = require('path');
var through = require('through2');
var util = require('util');
var yamljs = require('yamljs');

var PLUGIN_NAME = 'gulp-yaml-extends';

module.exports = function(startObj, endObj) {
  if ((startObj && typeof startObj !== 'object') || (endObj && typeof endObj !== 'object')) {
    throw new gutil.PluginError(PLUGIN_NAME, PLUGIN_NAME + ': Invalid start and/or end object!');
  }

  function logObject(name,obj){
    console.log('>');
    console.log(name + ":");
    console.log(util.inspect(obj, {showHidden: false, depth: null}));
    console.log('>');
  }

  function walkObject(obj, objParent, search) {
    //logObject("walkObject:", obj);
    var objects = [];
    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        console.log(key);
        var value = obj[key];
        if (typeof obj[key] == 'object') {
            objects = objects.concat(walkObject(obj[key], obj, search));
        } else {
            //property.
            if (key.indexOf(search) > -1) {
              console.log("Found EXTENDS!");
              //logObject("parent:", objParent);
              //logObject("obj:", obj);

              var where = key.indexOf(search);
              var keyToExtend = key.substring(0,where);
              //console.log("key to extend:" + keyToExtend);
              //var where = value.indexOf(search);
              //var a =
              //var path = value.substr(where + search.length);
              var path = value;
              //console.log("path:" + path);

              if (path){
                // remove the extends from the object.
                delete obj[key];

                var extended = yamljs.load(path);
                //logObject("extended", extended);

                //logObject("the extention", obj);
                //objects.push(obj);
                // merge the current object.
                var merged = merge(extended, obj);
                //logObject("extended node", merged);
                obj[keyToExtend] = merged;
                //logObject("obj", obj);
                //logObject("objParent", objParent);
              }
            }
        }
    }
    //return objects;
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

      try {
        var json = file.contents.toString('utf8');
        var fileObj = JSON.parse(json);

        //Find extends
        walkObject(fileObj, fileObj, "-extends");

        logObject("fileObj", fileObj);

        var mergedBuffer = new Buffer(JSON.stringify(fileObj, null, '  '),'utf8');
        file.contents = mergedBuffer;

      } catch (err) {
       return this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
      }

      this.push(file);
      callback();
    }

  });
};
