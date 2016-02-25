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
##API

支持微信消息类型包括一下method`text`,`image`,`voice`,`video`,`shortvideo`,`location`,`link`,`event`,`device_text`,`device_event`等，以`event`为例：

###router[method\]([matcher][,...handeler])

按如下微信信息：

```xml
<xml>
	<ToUserName><![CDATA[toUser]]></ToUserName>
	<FromUserName><![CDATA[FromUser]]></FromUserName>
	<CreateTime>123456789</CreateTime>
	<MsgType><![CDATA[event]]></MsgType>
	<Event><![CDATA[subscribe]]></Event>
	<EventKey><![CDATA[qrscene_123123]]></EventKey>
	<Ticket><![CDATA[TICKET]]></Ticket>
</xml>
```
router.js

```js
const Router = require('wechat-router');
let router = new Router();
//响应所有msgType为event的请求
router.event((req, res, next) => {
  res.reply('hi');
});
//响应msgType为event, Ticket ='TICKET'的请求
router.event({Ticket: 'TICKET'}, (req, res, next) => {
  res.reply('hi');
});
//响应msgType为event,EventKey匹配正则为/123/的请求
router.event({EventKey: /123/}, (req, res, next)=> {
  req.user = {};
  next();
}, (req, res, next) => {
  res.reply('hi');
});
```

###router.all([matcher][,...handeler])

响应所有类型的请求

###router.text([matcher][,...handeler])

`router.text()`还可以接受String和RegExp类型的matcher

```js
//响应msgType为text,Content=123的请求
router.text('123', (req, res, next) => {
  res.reply('hi');
});
//响应msgType为text,Content匹配正则为/123/的请求
router.text(/123/, (req, res, next) => {
  res.reply('hi');
});
```

##TODO

- 对话模式
- Koa/Co版

## License

The MIT license.