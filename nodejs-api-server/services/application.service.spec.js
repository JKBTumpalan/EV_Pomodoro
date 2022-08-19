/**
 * This is the test for the application model
 */

const assert = require('assert');

const ApplicationModel = require('./application.model.js');

describe('Application Model', function () {

    // This config is injected into the model
    const config = {
        "x-powered-by": "NodeJS-API-Pattern"
    };

    const applicationModel = new ApplicationModel(config);

    it('should return the correct x-powered-by config option', function () {
        assert.equal(applicationModel.getXPoweredByHeader(), config["x-powered-by"]);
    });

});