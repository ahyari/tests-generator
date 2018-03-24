#!/usr/bin/env node

'use strict';
const TestGenerator =  require('./TestGenerator');
const version = require('../package.json').version;
const os        = require('os');
const cli       = require('cli').enable('version');

cli.parse({
    version:      ['v',   'Get version'],
    src: [ 'src', 'target code directory', 'file', 'src/' ],
    unitTest: [ 'unit-test', 'target unit test directory', 'file', 'test/unit/' ],
    integTest: [ 'integ-test', 'target unit test directory', 'file', 'test/unit/' ],
    unitTestTemplate : [ 'unit-test-template', 'template for unit test', 'file', 'node_modules/tests-generator/src/templates/unit-test.js' ],
    integTestTemplate : [ 'integ-test-template', 'template for integration test', 'file', 'node_modules/tests-generator/src/templates/integration-test.js' ],
    excludedDirectories : ['exclude-dir','comma separated directory names','string','algorithm-repository, data, routes, bin'],
    excludedFiles : ['exclude-dir','comma separated file names','string','app.js'],

});

cli.main(function(args, options) {

    if (options.version) {
        return console.log('tests-generator version:', version)
    }
    else {
        var generateUnitTests = new TestGenerator(
            options.src,
            options.unitTest,
            options.integTest,
            options.unitTestTemplate,
            options.integTestTemplate,
            options.excludedDirectories,
            options.excludedFiles);

        generateUnitTests.generate();

        return console.log('test generated successfully.');
    }


});
