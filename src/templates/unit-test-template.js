const chai = require('chai');
const rewire = require('rewire');
const Promise = require('bluebird');
const chaiAsPromised = require("chai-as-promised");

const expect = require('chai').expect;
const assert = require('chai').assert;

const BaseTest = require('pathToBaseTestBaseTest');

var targetFile = require('pathToSrctargetFile');

class ClassName extends BaseTest {

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

(new ClassName()).executeTests();