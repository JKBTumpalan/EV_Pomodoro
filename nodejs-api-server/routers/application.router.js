/**
 * This is the Application (general utility) router.
 */

const express = require('express');
const bodyParser = require('body-parser');

module.exports = function ApplicationRouter(applicationController) {

    const router = express.Router();

    /**
     * Parse HTTP request bodies as JSON
     */
    router.use(bodyParser.json());

    /**
     * Set the response's content type header to JSON.
     */
    router.use((req, res, next) => {
        res.type('json');
        next();
    });

    /**
     * Log the request and send it to the next middleware function
     */
    router.use((req, res, next) => {
        console.info(`api-server received ${req.method} ${req.url}`);
        next();
    });

    /**
     * This sets the X-Powered-By header onto the response.
     */
    router.use((req, res, next) => {
        applicationController.getXPoweredByHeader()
            .then(
                (number) => {
                    /**
                     * Bind the api version to the request and pass the request to the next middleware handler
                     * See: https://expressjs.com/en/guide/using-middleware.html
                     */
                    res.header('x-powered-by', number)
                    next();
                },
                (issue) => {
                    /**
                     * Send the issue to the error handling middleware to be processed.
                     * See: https://expressjs.com/en/guide/error-handling.html
                     */

                    next(issue);
                }
            );
    });

    return router;
};
