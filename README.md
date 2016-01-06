# magnolia-lighter
POC for system to process very light configuration files into valid Magnolia 5.4.3 compatible config.

##Features

####Dialog Fields:
You can use names like textField instead of info.magnolia.ui.form.field.definition.TextFieldDefinition.

####Extends:
YAML must still be valid YAML.
To use, include a field with a '-extends' after it, with a path as a value.
For example "tabs-extends":
will extend tabs.

####Prototypes:
Specify prototypes for configuration of each definition type.
Definitions will then merge with those automatically.
(Uses Extends feature.)

####Dialogs have default actions
A /prototypes/prototype.dialog.yaml configures the commit and cancel action.
(Uses prototype feature)

####Script Auto-reference
If a template definition does not specify a template script - then a ref to the script with the same name is automatically included.

####Dialog Auto-reference
If a template definition does not specify a dialog - then a ref to the dialog with the same name is automatically included.

####Easy Apps
A yaml file in the apps directory needs only configure name, displayName, icon & workspace.
This information is rendered via a handlebar template strored in  /config-templates/app-template.yaml.hbs, resulting in a full app yaml configuration.

##Usage
* Install npm https://www.npmjs.com/.
* Run 'npm install' to install all of the dependencies.
* Place all source files in 'examples/src-lighter' directory (Note - 'hello-magnolia' is already there.)
From command line run:
* gulp webResources
* gulp templates
* gulp dialogs
* gulp apps
Or to run all of the above tasks in parallel, run the default task: - just type
* gulp

###Watching
* gulp watch - Runs whenever any file changes. (Not fully tested.)
* 5.4.3 compatible files are created (overwritten) in 'examples/light-modules' directory.

License:
MIT
