/**
 * This is the Application (general utility) controller.
 */

module.exports = function(applicationModel) {

    /**
     * Async method that returns a promise with the result or rejects with a message.
     * This describes the normal use of the controller calling then returning the result from the service
     */
    const getXPoweredByHeader = () => {
        return new Promise((resolve, reject) => {
            resolve(applicationModel.getXPoweredByHeader());
        });
    };

    return {
        getXPoweredByHeader: getXPoweredByHeader
    };
};
