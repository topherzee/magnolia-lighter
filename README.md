# magnolia-lighter
POC for system to process very light configuration files into valid Magnolia 5.4.3 compatible config.

##Features

###Fields:
You can use names like textField.

###Prototypes:
Specify prototypes for configuration of each definition type.
Definitions will then merge with those automatically.

###Extends:
YAML must still be valid YAML.
To use - include a field with a '-extends' after it, with a path as a value.
tabs-extends:
will extend tabs.

##IN PROGRESS:

TemplateDefinition AutoReferencing:
Automatic association based on file name.
A template definition will automatically use the dialog with the same name if no dialog is specified.
A template definition will automatically use the templateScript with the same name if no script is defined.

License:
MIT
