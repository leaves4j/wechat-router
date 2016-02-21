wechat-router
=============
wechat-router是一个基于[node-wechat](https://github.com/node-webot/wechat)的微信路由中间件，用法类似express的router
## Installation

```sh
$ npm install wechat-router
```

## Use with Connect/Express

```js
const wechat = require('wechat');
const Router = require('wechat-router');

const config = {
  token: 'token',
  appid: 'appid',
  encodingAESKey: 'encodinAESKey'
};

let router = new Router();

router.text('hello', (req, res, next)=> {
  res.reply('word');
});

let anotherRouter = new Router();

anotherRouter.event({EventKey: '123456'}, (req, res, next)=> {
  res.reply({
    type: "music",
    content: {
      title: "来段音乐吧",
      description: "一无所有",
      musicUrl: "http://mp3.com/xx.mp3",
      hqMusicUrl: "http://mp3.com/xx.mp3",
      thumbMediaId: "thisThumbMediaId"
    }
  })
});

function midDeal(req, res, next) {
  //do something
  next();
}

router.event({Event: 'SCAN'}, midDeal, anotherRouter);

app.use(express.query());
app.use('/wechat', wechat(config, router));
```
##TODO
- 对话模式
- Koa/Co版

## License
The MIT license.