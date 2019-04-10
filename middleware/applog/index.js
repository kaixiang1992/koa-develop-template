const logger = require("./logger");


module.exports = (options) => {
    const loggermiddleware = logger(options);
    return async (ctx, next) => {
        return loggermiddleware(ctx, next);
    }
}