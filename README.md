# magnolia-lighter
POC for system to process very light configuration files into valid Magnolia 5.4.3 compatible config.

##Features

####Fields:
You can use names like textField.

####Extends:
YAML must still be valid YAML.
To use - include a field with a '-extends' after it, with a path as a value.
tabs-extends:
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


##Usage
* Install npm https://www.npmjs.com/.
* Run 'npm install' to install all of the dependencies.
* Place all source files in src-lighter directory (Note - already present in 'example' directory)
From command line run:
* gulp copy
* gulp extends
* gulp autoref
  * or to run all of the above tasks in sequence, run the default task: - just type
  * gulp
* Files in light-modules directory are overwritten.

License:
MIT
