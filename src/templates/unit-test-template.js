var expect = require('chai').expect;
var assert = require('chai').assert;
var chai = require('chai');
var rewire = require('rewire');
var Promise = require('bluebird');
var chaiAsPromised = require("chai-as-promised");
var BaseTest = require('$$pathToTestBaseTest');

var $$file_name = require('$$pathToSrc$$file_name');

class $$Class_Name extends BaseTest {

    executeTests() {

        describe("Feature", function () {

            before(function () {
                // runs before all tests in this block
            });

            after(function () {
                // runs after all tests in this block
            });

            beforeEach(function () {
                // runs before each test in this block
            });

            afterEach(function () {
                // runs after each test in this block
            });


            describe("Senario", function () {
                it("Does something expected", function () {
                    expect(true).to.eql(false);
                });
            });
        });
    }
}

(new $$Class_Name()).executeTests();