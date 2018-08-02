Ecome Template
==============

Before you start you will need NodeJS + Node Packages, GruntJS and SASS.


### First, install node.js

Grunt needs [node](https://nodejs.org/en/) to work. If you don't have it yet, [download the current version](https://nodejs.org/en/download/current/) (not the LTS) and install it. 
Node comes with [npm](https://www.npmjs.com/), the node package manager, which you will use to install packages.


### Install Grunt

Open up a terminal window and type in the command below

```
sudo npm install -g grunt-cli
```

The “-g” in the command above will install grunt globally, so we can use it everywhere. 
Sudo will run the command as an administrator. You can skip the “sudo” part if you are using a windows machine.


### Install SASS

You will need [SASS](https://sass-lang.com/) to write the CSS.

In terminal window type in the command below

```
sudo npm install -g sass
```

The “-g” in the command above will install grunt globally, so we can use it everywhere. 
Sudo will run the command as an administrator. You can skip the “sudo” part if you are using a windows machine.


### Install Packages

Now you will need to get all node packages.
Open the folder in your terminal window and type in the command below

```
npm install
```


### Package Overview

**Most Used Plugins**

* grunt-processhtml: For the HTML template.

* grunt-contrib-clean: Clean files and folders from the project.

* grunt-contrib-connect: Start a connect web server.

* grunt-contrib-watch: Watch for file changes & Reload assets live in the browser.

* grunt-contrib-copy: Copy files into a different folder.

* grunt-text-replace: Remove strings for production.


**For CSS Compilation**

* grunt-contrib-sass: Compile Sass to CSS.

* grunt-autoprefixer: CSS prefix


**For Minify**

* grunt-contrib-cssmin: Minify CSS.

* grunt-contrib-htmlmin: Minify HTML.

* grunt-contrib-uglify: Minify files with UglifyJS.

**For Validation**

* grunt-contrib-jshint: Validate JS

-------------------------------------------------------------------

# SASS Structure

This template is using [BEM](http://getbem.com/introduction/) and [OOCSS](http://oocss.org/).


# Run Grunt

Open the folder in your terminal window and type in the command below for development

```
grunt dev
```

For production and to minify everything use

```
grunt prod
```

And if you just want to validate the JavaScript use

```
grunt checkjs
```
