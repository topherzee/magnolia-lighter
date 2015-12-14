
'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var util = require('util');

var PLUGIN_NAME = 'gulp--auto-ref';

//#templateScript: /hello-magnolia/templates/components/quotation.ftl
var SCRIPT_EXTENSION = 'ftl';

module.exports = function() {

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

      try {


        var fileObj = JSON.parse(file.contents.toString('utf8'));

        // Auto reference - templateScript.
        if (fileObj){
          if(!fileObj['templateScript']){//{
            console.log("a:" + 1);

            var relPath = file.path.substring(file.base.length - 1);
            var relPathScript = relPath.substring(0, relPath.lastIndexOf('.')) + '.' + SCRIPT_EXTENSION;
            //console.log("file.path:" + file.path);
            //console.log("relPath:" + relPath);
            //console.log("relPathScript:" + relPathScript);
            //TODO: Check for existance of file!
            fileObj['templateScript'] = relPathScript;
          }
          //TODO: ALSO ADD THE AUTO DIALOG PROPERTY.
          // if(!fileObj['dialog']){//{
          //   console.log("a:" + 1);
          //
          //   var relPath = file.path.substring(file.base.length - 1);
          //   var relPathScript = relPath.substring(0, relPath.lastIndexOf('.')) + '.' + SCRIPT_EXTENSION;
          //   //console.log("file.path:" + file.path);
          //   //console.log("relPath:" + relPath);
          //   //console.log("relPathScript:" + relPathScript);
          //   //TODO: Check for existance of file!
          //   fileObj['templateScript'] = relPathScript;
          // }


          // //See props of file.
          // for (var key in file) {
          //     if (!file.hasOwnProperty(key)) continue;
          //     console.log("file: " + key + ": " + file[key]);
          // }

          var mergedBuffer = new Buffer(JSON.stringify(fileObj, null, '  '),'utf8');
          file.contents = mergedBuffer;
        }

      } catch (err) {
       return this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
      }


    }
    this.push(file);
    callback();

  });
};
