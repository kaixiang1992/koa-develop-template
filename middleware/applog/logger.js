const path = require("path");
const log4js = require('log4js');
const methods = ['trace，debug，info，warn，error，fatal']; //TODO: 日志级别

function dealloggermsg(ctx, message, opt) {
    const { host, method, url, headers} = ctx;
    const client = { host, method, url, ...message, language: headers['accept-language'] }
    return JSON.stringify(Object.assign(opt, client));
}

module.exports =  (options) => {
    const contextlogger = Object.create(null), appenders = Object.create(null);
    const { level, env, dir, projectname } = options;
    appenders['app'] = {
        type: 'dateFile',
        filename: `${dir}/${env}`,
        pattern: 'yyyy-MM-dd.log',
        layout: {
            type: 'basic'
        },
        compress: true, //TODO: 开启gzip压缩
        alwaysIncludePattern: true, //TODO: 开启备份
        daysToKeep: 30 //TODO: 删除一个月前日志
    }
    // TODO: 开发环境,输出至调试控制台
    if(env == 'develop'){
        appenders['out'] = { type: 'console' }
    }
    const configure = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: level
            } 
        }
    }
    log4js.configure(configure);
    const logger = log4js.getLogger('app');
    return async (ctx, next) => {
        const starttime = Date.now();
        methods.forEach(method => {
            contextlogger[method] = (message) => {
                logger[method](dealloggermsg(ctx, message, {projectname, env}));
            }
        });
        ctx.log = contextlogger;
        await next();
        const endtime = Date.now();
        const responsetime = ((endtime - starttime) / 1000).toFixed(2);
        logger[level](dealloggermsg(ctx, {responsetime: `响应时间为: ${responsetime}s`}, {projectname, env}));
    }
}