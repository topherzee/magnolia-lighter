# magnolia-lighter
Build tool to process Very light configuration files, or configuration of your
own design into valid Magnolia 5.4.4 compatible config.

##About
With 5.4 Magnolia CMS introduced Light Development, including the ability
to develop CMS projects totally on the file system with yaml files.

In a way, you can consider the magnolia configuration file as its API.
How you create those files is up to you, from scratch - copying other files,
or generating files via another app or build tool....

Lighter employs (and demonstrates) a set of techniques based on the 'gulp'  
build tool to generate Magnolia configuration.

Lighter comes with a set of implemented 'Features' listed below that have often
been requested. Some of these may evenutally supported directly in Magnolia -
but until then you can already use Lighter if you want to try or use them.

I've intentionally left the code very exposed, not hiding it away, so that you
can see how easy it is to experiment. I hope that you may come up with your own shortcuts or improvements. If so - dont be shy to fork the project and share your changes with others.


###Lighter Configuration Features

#####Dialog Fields:
You can use names like textField instead of info.magnolia.ui.form.field.definition.TextFieldDefinition.

#####Extends (Include and Merge):
YAML must still be valid YAML.
To use, include a field with a '--extends' after it, with a path as a value.
For example "tabs--extends":
will extend tabs.

#####Prototypes:
Specify prototypes for configuration of each definition type.
Definitions will then merge with those automatically.
(Uses Extends feature.)

#####Dialogs have default actions
A /prototypes/prototype.dialog.yaml configures the commit and cancel action.
(Uses prototype feature)

#####Script Auto-reference
If a template definition does not specify a template script - then a ref to the script with the same name is automatically included.

#####Dialog Auto-reference
If a template definition does not specify a dialog - then a ref to the dialog with the same name is automatically included.

#####Easy Apps
A yaml file in the apps directory needs only configure name, displayName, icon & workspace.
This information is rendered via a handlebar template strored in  /config-templates/app-template.yaml.hbs, resulting in a full app yaml configuration.

##Demonstrated Key techniques
All of the 'Lighter' features mentioned above are based on these key techniques:

#####Yaml to Json to Yaml:
Node, npm and gulp modules operate on json. So its helpful to convert yaml to json and back.

#####Replace:
Provide a yaml file with simple key-value pairs of strings to replace in a set of files.
(Used by the Dialog Fields feature.)

#####Deep Merge:
Merge a yaml file with a set of files.

#####Template processing (Handlebars)
Run (or 'wrap') a set of configuration files through a template.
(Used by the Easy Apps)

##Usage

###Usage Basics
* Install npm https://www.npmjs.com/.
* Run 'npm install' to install all of the dependencies.

From command line run:
* gulp webResources
* gulp templates
* gulp dialogs
* gulp apps
Or to run all of the above tasks in parallel, run the default task: - just type
* gulp

* By default, Magnolia compatible files are created (overwritten) in the `examples/hello-lighter/dest/hello-magnolia` directory.

###Watching
* gulp watch - Runs whenever any file changes. (Not fully tested.)

###Usage on your Magnolia project
You could set it up in a number of ways, but here is one pattern that you could start with.

Directory Setup:
* Copy the entire magnolia-lighter to a new directory for your project: `<myProj>/magnolia-lighter`.
 * (This enables you to hack on anything in the project, without disturbing other projects.)
* Copy `examples/starter/src-lighter` dir to your project:
`<myProj>/src-lighter`
* Create `<myProj>/src-modules` dir and put your modules with lighter configuration files in there.
* Create `<myProj>/modules` dir which will contain the output.
 * (And is where you should point your actual Magnolia CMS instance via the `magnolia.resources.dir` value in the `magnolia.properties` file.

Configuration:
* In `<myProj>/magnolia-lighter/gulpfile.js}` set these values to the proper directory
```
var SRC_LIGHTER_DIR = '<full-or-relative-path>/<myProj>/src-lighter';
var SRC_MODULES_DIR = '<full-or-relative-path>//<myProj>/src-modules';
var DEST_DIR = '<full-or-relative-path>/<myProj>/modules';

```

##Hacking on magnolia-lighter
Try changing the configuration files in the `src-lighter` directory.
* Include additional field classes with `replacements/dialog-fields.yaml`.
* Change the dialog definition boilerplate with `prototypes/dialog.yaml`.
* Change the template definition boilerplate with `prototypes/template.yaml`.
* Change the app template with `config-template/app-example.yaml.hbs`.

Change or create your own processes by editing the gulpfile.js.

To Quickly try creating a new gulp plugin, follow the example provided by the `magnolia-lighter/src/gulp-lighter-auto-ref.js` plugin.

##Have Fun!
And let me know if you have troubles.

License:
MIT
