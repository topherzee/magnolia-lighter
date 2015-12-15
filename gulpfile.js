var gulp = require('gulp');
var runSequence = require('run-sequence');
var yamljs = require('yamljs');
var replace = require('gulp-replace-task');
var through = require('through-gulp');
var yaml = require('gulp-yaml');
var mergeJson = require('gulp-merge-json');

var mergeJsonIndividual = require('./src/gulp-merge-json-individual.js');
var yamlOut = require('./src/gulp-yaml-out.js');
var yamlExtends = require('./src/gulp-yaml-extends');
var AutoRef = require('./src/lighter-auto-ref');

var SRC_DIR = 'example/src-lighter';
var DEST_DIR = 'example/light-modules';

var DIALOG_PROTOTYPE = yamljs.load(SRC_DIR + '/prototypes/prototype.dialog.yaml');

var FIELDS = [
  {name: /textField/g,           className: 'info.magnolia.ui.form.field.definition.TextFieldDefinition'},
  {name: /richTextField/g,       className: 'info.magnolia.ui.form.field.definition.RichTextFieldDefinition'},
  {name: /dateField/g,           className: 'info.magnolia.ui.form.field.definition.DateFieldDefinition'},
  {name: /hiddenField/g,         className: 'info.magnolia.ui.form.field.definition.HiddenFieldDefinition'},
  {name: /multiValueField/g,     className: 'info.magnolia.ui.form.field.definition.MultiValueFieldDefinition'},
  {name: /passwordField/g,       className: 'info.magnolia.ui.form.field.definition.PasswordFieldDefinition'},
  {name: /selectField/g,         className: 'info.magnolia.ui.form.field.definition.SelectFieldDefinition'},
  {name: /optionGroupField/g,    className: 'info.magnolia.ui.form.field.definition.OptionGroupFieldDefinition'},
  {name: /twinColSelectField/g,  className: 'info.magnolia.ui.form.field.definition.TwinColSelectFieldDefinition'},
  {name: /comboBoxField/g,       className: 'info.magnolia.ui.form.field.definition.CheckBoxFieldDefinition'},
  {name: /compositeField/g,      className: 'info.magnolia.ui.form.field.definition.CompositeFieldDefinition'},
  {name: /switchableField/g,     className: 'info.magnolia.ui.form.field.definition.SwitchableFieldDefinition'},
  {name: /basicUploadField/g,    className: 'info.magnolia.ui.form.field.definition.BasicUploadFieldDefinition'},
  {name: /damUploadFieldField/g, className: 'info.magnolia.dam.app.ui.field.definition.DamUploadFieldDefinition'}
];

var FIELDS_REPLACE = FIELDS.map(function(field){
  return {match: field.name,
    replacement: field.className
  };
});

// For testing purposes.
// var endObj = {
//     "actions": {
//       "YO": [{a:"b"}],
//       "LO": [{c:"d"}]
//     }
// };
//
// var startObj = {
//   "form": {
//     "tabs": [
//       {
//         "coolness": "9"
//       }
//     ]
//   }
// }

/**
Default.
Runs when you type 'gulp'.
*/
gulp.task('default', ['all']);

/**
Configure which files to watch and what tasks to use on file changes
TODO: Currently only runs extends task.
*/
gulp.task('watch', function() {
  console.log('watch start.');
  gulp.watch(SRC_DIR + '/**/*.*', ['extends']);
});

/**
Runs when you type 'gulp all'.
Runs tasks in sequence.
TODO: Stops working after one run when called from gulp.watch.
*/
gulp.task('all', function(callback) {

  runSequence('copy','extends', 'autoref',
    function(){
      console.log('default gulp task is done.');
      callback;
    }
  );
});

/**
Copy all files.
TODO: Only copy non dialog & template defs - since they are handled in other tasks.
*/
gulp.task('copy', function () {

  console.log('Start task: copy');
  return gulp.src(SRC_DIR + '/*') // Get source files with gulp.src
    //.pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest(DEST_DIR)) // Outputs the file in the destination folder
})

/**
Operates on tempaltes for now.
*/
gulp.task('autoref', function(){

  console.log('Start task: autoref');
  gulp.src(SRC_DIR + '/*/templates/**/*.yaml')
    .pipe(yaml({ space: 2 }))
    .pipe(AutoRef())
    //.pipe(yamlExtends())
    //.pipe(mergeJsonIndividual(DIALOG_PROTOTYPE))
    .pipe(yamlOut())
    .pipe(gulp.dest(DEST_DIR))
});

/**
Processes: Extends, fields, prototypes
Operates just on dialog defs for now.
TODO: Process template defs as well. But dont colide with the autoref.
*/
gulp.task('extends', function(){

  console.log('Start task: extends');
  gulp.src(SRC_DIR + '/*/dialogs/**/*.yaml')

    .pipe(replace({
      patterns: FIELDS_REPLACE
    }))
    .pipe(yaml({ space: 2 }))
    .pipe(yamlExtends())
    .pipe(mergeJsonIndividual(DIALOG_PROTOTYPE))
    .pipe(yamlOut())
    .pipe(gulp.dest(DEST_DIR))
});


//
// gulp.task('fieldsprototype', function(){
//
//   gulp.src(SRC_DIR + '/*/dialogs/**/*.yaml')
//   //First parse the extends - as it is not valid YAML.
//     .pipe(replace({
//       patterns: FIELDS_REPLACE
//     }))
//     .pipe(yaml({ space: 2 }))
//     .pipe(mergeJsonIndividual(DIALOG_PROTOTYPE))
//     .pipe(yamlOut())
//     .pipe(gulp.dest(DEST_DIR))
// });
//
//
// gulp.task('fieldsjson', function(){
//
//   var FIELDS_REPLACE = fields.map(function(field){
//     return {match: field.name,
//       replacement: field.className
//     };
//   });
//   //console.log(FIELDS_REPLACE);
//   gulp.src(SRC_DIR + '/*/dialogs/**/*.yaml')
//     .pipe(replace({
//       patterns: FIELDS_REPLACE
//     }))
//     .pipe(yaml({ space: 2 }))
//     .pipe(gulp.dest(DEST_DIR))
// });
//
// gulp.task('fields', function(){
//
//   var FIELDS_REPLACE = fields.map(function(field){
//     return {match: field.name,
//       replacement: field.className
//     };
//   });
//
//   console.log(FIELDS_REPLACE);
//
//   gulp.src(SRC_DIR + '/**/*')
//     .pipe(replace({
//       patterns: FIELDS_REPLACE
//     }))
//     .pipe(gulp.dest(DEST_DIR))
// });
