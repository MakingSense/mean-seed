[![Stories in Ready](https://badge.waffle.io/MakingSense/mean-seed.png?label=ready&title=Ready)](https://waffle.io/MakingSense/mean-seed) [![Build Status](https://travis-ci.org/MakingSense/mean-seed.svg?branch=master)](https://travis-ci.org/MakingSense/mean-seed) 
MEAN-seed  
=========

A bootstrapp application based on MongoDB, Express, Angular, Node, Passport.

### Requirements

- Node and NPM
- Bower
- Grunt client

### Setup

```
npm install
```

Read more about installing [Node](https://nodejs.org/download/), [Bower](http://bower.io/) and [Grunt client](http://gruntjs.com/getting-started).

### Installing MongoDB

Go to [MongoDB official downloads](http://www.mongodb.org/downloads) and follow the [instructions](http://docs.mongodb.org/manual/installation/)

### Running the app for development

Run ```grunt dev``` to start the app in development mode with client-server livereload. (Remember to have the mongoDB running)

### Testing

TODO: we need to improve testing configuration and related tasks.

If you have the following error:

```
Could not find chromedriver at C:\randomfolder\mean-seed\node_modules\grunt-protractor-runner\node_modules\protractor\selenium\chromedriver.exe
```

Add this setting at `protractor.conf.js`:

```
chromeDriver: 'C:/Users/youruser/AppData/Roaming/npm/node_modules/protractor/selenium/chromedriver.exe'
```