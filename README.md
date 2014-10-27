# grunt-inlinestyles

> A Grunt plugin to inline a selected CSS file. Ideal for inlining critical CSS.

This will take a HTML stylesheet link and inline the target CSS.

This means that:

```
<link rel="stylesheet" href="/css/stylesheet.css" data-inline="true">
```

will become:

```
<style>h1{font-style:italic}</style>
```

This module does *not* inline javascript, images or fonts. 

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-inlinestyles --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-inlinestyles');
```

## The "inlinestyles" task

### Overview
In your project's Gruntfile, add a section named `inlinestyles` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  inlinestyles: {
    options: {
      // Task-specific options go here.
      basepath: './',
      minify: true,
      tag: '[data-inline="true"]'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      files: {
        'destination.html': 'source.html'
      }
    },
  },
})
```

### Options

#### options.basepath
Type: `String`
Default value: `'process.cwd()'`

A string value that is used to indicate the root of your website. 'Absolute' CSS links are relative to this value. 

#### options.minify
Type: `boolean`
Default value: `true`

A boolean that is used to turn minification of the inlined CSS on or off.

#### options.tag
Type: `String`
Default value: `'[data-inline="true"]'`

A string value that is used to designate a CSS link that is to be inlined.

### Usage Examples

#### Default Options
In this example, the default options are used to inline CSS inside `source.html`. So if the `source.html` file has the content `<link rel="stylesheet" href="/css/stylesheet.css" data-inline="true">` the generated result would contain `<style>h1{font-style:italic}</style>`

```js
grunt.initConfig({
  inlinestyles: {
    options: {},
      files: {
        'destination.html': 'source.html'
      }
  },
})
```

#### Custom Options
In this example, custom options are used to specify a new basepath, disable CSS magnification and to add a new inlining tag. 

```js
grunt.initConfig({
  inlinestyles: {
    options: {
      basepath: 'subpath',
      minify: false,
      tag: '[data-inlinethisstyle="true"]'
    },
      files: {
        'destination.html': 'source.html'
      }
  },
})
```

## Contributing
Contributions are welcome! Hit me up via [@sonniesedge](https://twitter.com/sonniesedge)

## Release History
v0.1 Initial release

## License
Copyright (c) 2014 . Licensed under the MIT license.
