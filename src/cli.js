#!/usr/bin/env node

'use strict';

const os        = require('os');
const cli       = require('src/cli').enable('version');
const genTests = require('./index.js');

cli.parse({
    'version':      ['v',   'Get version']
});


cli.main(function(args, options) {

// fancy logo
console.log(`
                  VERSION: ${genTests.version} 

For support and information, please visit:
https://github.com/ahyari/tests-generator
`);


});
