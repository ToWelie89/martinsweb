martins-web
==========

## Introduction

This is my portfolio/personal site. I am hosting this site myself on a Raspberry Pi I have configured to work as a webserver. See www.martinsonesson.se

I will host all public files in this repository for anyone who may be interested in how its built.

Technologies & stuff used for this project:

+ AngularJS
+ jQuery
+ less
+ Grunt
+ Babel
+ Karma
+ Photoswipe
+ Instagram API
+ Wordpress API
+ Github API

For more technical documentation please see [the wiki](https://github.com/ToWelie89/martinsweb/wiki).

For code documentation please see [the jsdoc](http://www.martinsonesson.se/docs).

## How to run locally

- Clone the repo
- Run

```
npm install
```

- Run

```
grunt
```

TADA!

## More Grunt jobs

You can test the code by running

```
grunt test
```

This will jshint the js-files and jsonlint json-files.

```
grunt jsdoc
```

Generate jsdoc, will be generated into the folder ./docs