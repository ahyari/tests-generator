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
    integrationTestDirectory: [ 'it', 'target unit test directory', 'file', 'test/unit/' ],
    unitTestTemplate : [ 'utt', 'template for unit test', 'file', 'node_modules/tests-generator/src/templates/unit-test.js' ],
    integrationTestTemplate : [ 'itt', 'template for integration test', 'file', 'node_modules/tests-generator/src/templates/integration-test.js' ],
    excludedDirectories : ['ed','comma separated directory names','string','algorithm-repository, data, routes, bin'],
    excludeFiles : ['ef','comma separated file names','string','app.js'],

});

cli.main(function(args, options) {

    if (!options.version && !options.help) {

        var generateUnitTests = new TestGenerator(
            options.src,
            options.uniteTestDir,
            options.integrationTestDirectory,
            options.unitTestTemplate,
            options.integrationTestTemplate,
            options.excludedDirectories,
            options.excludedFiles);

        generateUnitTests.generate();

        return console.log('test generated successfully.');
    }


});
