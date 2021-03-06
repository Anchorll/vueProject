const routerApi = require('./router');
const bodyParser = require('body-parser'); 
const express = require('express');
const app=express();
// 监听端口
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/*允许普通html页面的ajax跨域请求*/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    next();
});

// 后端api路由
app.use('/api',routerApi);
app.listen(3000);
console.log('success listen at aport :3000');
