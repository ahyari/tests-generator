#!/usr/bin/env node

'use strict';
const path = require('path');
const os        = require('os');
const cli       = require('cli').enable('version');
const fs = require('fs');

const TestGenerator =  require('./TestGenerator');
const pakg = require('../package.json');
const version = pakg.version;
const name = pakg.name;
const nodeModulePath= path.dirname(fs.realpathSync(__filename));

cli.setApp(name, version)

cli.parse({
    source: [ 'src', 'target code directory', 'file', 'src/' ],
    unitTestDirectory : [ 'ut', 'target unit test directory', 'file', 'test/unit/' ],
    integrationTestDirectory: [ 'it', 'target unit test directory', 'file', 'test/integration/' ],
    unitTestTemplate : [ 'utt', 'template for unit test', 'file',
        nodeModulePath+'/templates/unit-test-template.js' ],
    integrationTestTemplate : [ 'itt', 'template for integration test', 'file',
        nodeModulePath+'/templates/integration-test-template.js' ],
    excludedDirectories : ['ed','comma separated directory names','string','algorithm-repository, data, routes, bin'],
    excludedFiles : ['ef','comma separated file names','string','app.js'],
    type : ['t','integration or unit','string','unit'],
    baseTestClass : ['t','integration or unit','file',nodeModulePath+'/templates/BaseTest.js'],

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
            options.type,
            options.baseTestClass);

        generateUnitTests.generate();
    }


});
