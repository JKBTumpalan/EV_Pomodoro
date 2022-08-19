/**
 * This is the test for the application controller. We will stub the application model
 * and inject it into the controller to test it.
 */

const assert = require('assert');
const sinon = require('sinon');
const ApplicationController = require('./application.controller.js');
const ApplicationModel = require('./application.model.js');

describe('Application Controller', function (done) {


    describe('.getXPoweredByHeader', function () {
        let applicationModel;
        let applicationController;
        let config;

        before(function() {
            config = {
                'x-powered-by': 'NodeJS-API-Pattern'
            };
            applicationModel = new ApplicationModel(config);
            sinon.stub(applicationModel, "getXPoweredByHeader").returns(config['x-powered-by']);

            /**
             * this will test that the controller delegates the call to the application model
             * and
             * that that controller method returns what we're expecting
             */
            controller = new ApplicationController(applicationModel);
        });

        it('should call applicationModel.getXPoweredByHeader', function (done) {
            controller.getXPoweredByHeader()
                .then(function () {
                    assert.equal(applicationModel.getXPoweredByHeader.calledOnce, true);
                    done();
                }, function (rejection) {
                    assert.fail(rejection);
                    done(rejection);
                });
        });

        it('should call return the correct value for applicationModel.getXPoweredByHeader', function (done) {
            controller.getXPoweredByHeader()
                .then(function (result) {
                    assert.equal(result, config["x-powered-by"]);
                    done();
                }, function (rejection) {
                    assert.fail(rejection);
                    done(rejection);
                });
        });

    });
});