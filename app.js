const koa = require("koa");
const app = new koa();
const network = require("./config/network");
const bodyParser = require('koa-bodyparser');
const path = require("path");
const static = require("koa-static");
const koaNunjucks = require("koa-nunjucks-2");
const router = require('./router');

// TODO: 静态资源中间件
app.use(static(path.resolve(__dirname, 'static'), {
    maxAge: 3600000 * 2 //TODO: 缓存静态资源2小时
}));

// TODO: 解析request body信息
app.use(bodyParser());

// TODO: nunjucks模板
app.use(koaNunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true
    }
}));

// TODO: 路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(network.port, network.host, () => {
    console.log(`Server running at ${network.protocol}://${network.host}:${network.port}`);
});