#!/usr/bin/env node

'use strict';
const TestGenerator =  require('./TestGenerator');
const pakg = require('../package.json');
const version = pakg.version;
const name = pakg.name;
const os        = require('os');
const cli       = require('cli').enable('version');

cli.setApp(name, version)

cli.parse({
    source: [ 'src', 'target code directory', 'file', 'src/' ],
    unitTestDirectory : [ 'ut', 'target unit test directory', 'file', 'test/unit/' ],
    integrationTestDirectory: [ 'it', 'target unit test directory', 'file', 'test/integration/' ],
    unitTestTemplate : [ 'utt', 'template for unit test', 'file',
        'test/templates/unit-test-template.js' ],
    integrationTestTemplate : [ 'itt', 'template for integration test', 'file',
        'test/templates/integration-test-template.js' ],
    excludedDirectories : ['ed','comma separated directory names','string','algorithm-repository, data, routes, bin'],
    excludedFiles : ['ef','comma separated file names','string','app.js'],
    type : ['t','integration or unit','string','unit'],

});

cli.main(function(args, options) {

    if (!options.version && !options.help) {

        var generateUnitTests = new TestGenerator(
            options.source,
            options.unitTestDirectory,
            options.integrationTestDirectory,
            options.unitTestTemplate,
            options.integrationTestTemplate,
            options.excludedDirectories,
            options.excludedFiles,
            options.type);

        generateUnitTests.generate();

        return console.log('test generated successfully.');
    }


});
