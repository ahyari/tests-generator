const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const rp = require('request-promise');

const BaseTest = require('$$pathToUnitTest/BaseTest');

chai.use(chaiHttp);
const expect = chai.expect;

class $$Class_Name extends BaseTest {

    executeTest() {

        describe("Feature", () => {

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

            describe("Senario", () => {
                it("Does something expected", (done) => {

                    //remove this after writing the test
                    expect(true).to.eql(false);

                    var options = {};

                    rp(options).then((result) => {
                        console.log(result);
                        done();
                    }).catch((err) => {
                        console.error(err);
                        throw err;
                    }).catch(done);

                });
            });
        });
    }
}

(new $$Class_Name()).executeTest();

