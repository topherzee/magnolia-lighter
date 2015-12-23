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

var DIALOG_PROTOTYPE = yamljs.load(SRC_DIR + '/prototypes/dialog.yaml');
var TEMPLATE_PROTOTYPE = yamljs.load(SRC_DIR + '/prototypes/template.yaml');

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

/**
Default.
Runs when you type 'gulp'.
*/
gulp.task('default', ['all']);

/**
Configure which files to watch and what tasks to use on file changes
TODO: Currently only runs extends task.
TODO: Exclude fragments & prototypes - maybe put those in special src directory.
*/
gulp.task('watch', function() {
  console.log('watch start.');
  gulp.watch(SRC_DIR + '/**/*.*', ['all']);
});

/**
Runs when you type 'gulp all'.
Note: steps run in parallel.
*/
gulp.task('all', function(callback) {
    processWebResources();
    processTemplates();
    processDialogs();
});

/**
Copy WebResources
*/
function processWebResources(){
    gulp.src(SRC_DIR + '/*/webresources/**/*.*') // Get source files with gulp.src
        .pipe(gulp.dest(DEST_DIR)) // Outputs the file in the destination folder
}
gulp.task('webResources', function () {

  console.log('Start task: webResources');
    processWebResources();
})

/**
Process templates.
*/
function processTemplates(){
  console.log('Start task: templates');
  gulp.src(SRC_DIR + '/*/templates/**/*.yaml')
    .pipe(yaml({ space: 2 }))
    .pipe(yamlExtends())
    .pipe(mergeJsonIndividual(TEMPLATE_PROTOTYPE))
    .pipe(AutoRef())
    .pipe(yamlOut())
    .pipe(gulp.dest(DEST_DIR))
}
gulp.task('templates', function(){
    processTemplates();
});

/**
Processes dialogs
*/
function processDialogs(){
  console.log('Start task: dialogs');
  gulp.src(SRC_DIR + '/*/dialogs/**/*.yaml')
    .pipe(replace({
      patterns: FIELDS_REPLACE
    }))
    .pipe(yaml({ space: 2 }))
    .pipe(yamlExtends())
    .pipe(mergeJsonIndividual(DIALOG_PROTOTYPE))
    .pipe(yamlOut())
    .pipe(gulp.dest(DEST_DIR))
}
gulp.task('dialogs', function(){
    processDialogs();
});
