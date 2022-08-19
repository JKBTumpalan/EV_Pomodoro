/**
 * Store your configuration data here, segmented by environment.
 *
 * REMEMBER!!
 * Don't store any passwords or secrets in plaintext.
 * Instead, set them on the system as environment variables,
 * and read those variables here.
 */

/* Set a default NODE_ENV if one isn't set */
let NODE_ENV = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: 9000,
    "x-powered-by": "nodejs-api-pattern",
  },
};

/**
 * Export out the configuration data only for the environemnt specified by NODE_ENV.
 */
module.exports = config[NODE_ENV];
