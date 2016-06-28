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

Environment variables:
Remember to set up Auth0 credentials using the ".env" file. Please go ahead and use the existent one to put the proper information.

### Installing MongoDB

Go to [MongoDB official downloads](http://www.mongodb.org/downloads) and follow the [instructions](http://docs.mongodb.org/manual/installation/)

### Development

We are currently using Grunt as our task runner. For general development only run:

`grunt`

### Testing

In order to execute all tests and validate the code you could run:

`grunt validate`

For coverage run:

`grunt coverage`

If you have any issue with testing environment please read [known errors](https://github.com/MakingSense/mean-seed/wiki/Known-errors) page.
