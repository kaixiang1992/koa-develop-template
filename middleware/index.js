const path = require("path");
const applog = require("./applog");

module.exports = (app) => {
    app.use(applog({
        level: process.env.NODE_ENV  ? 'info' : 'debug',
        env: process.env.NODE_ENV || 'develop',
        dir: path.resolve(__dirname, '../logs'),
        projectname: 'koa-develop-template'
    }));
}