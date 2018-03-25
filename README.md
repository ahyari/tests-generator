# tests-generator
This package is work in progress tool to generate tests for nodejs app. it's purpose is to help add unit and integration tests to old node projects.

## Install
```sh
$ npm install nexrender [-g]
```


## Usage:
  tests-generator [OPTIONS] [ARGS]

## Options
   
* **-src**, --source [FILE]  target code directory (Default is src/)
* **-ut**, --unitTestDirectory [FILE]target unit test directory (Default is test/unit/)
* **-it**, --integrationTestDirectory [FILE]target unit test directory (Default is test/unit/)
* **-utt**, --unitTestTemplate [FILE]template for unit test (Default is node_modules/tests-generator/src/templates/unit-test.js)
* **-itt**, --integrationTestTemplate [FILE]template for integration test (Default is node_modules/tests-generator/src/templates/integration-test.js)
* **-ed**, --excludedDirectories [STRING]comma separated directory names (Default is algorithm-repository, data, routes, bin)
* **-ef**, --excludeFiles [STRING]comma separated file names (Default is app.js)
* **-v**, --version          Display the current version
* **-h**, --help             Display help and usage details

