'use strict';
require('dotenv').config();

const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN, // 替換成你的 CHANNEL_ACCESS_TOKEN
  channelSecret: process.env.CHANNEL_SECRET, // 替換成你的 CHANNEL_SECRET
};

const client = new line.Client(config);

const app = express();

app.get('/', (req, res) => {
  res.send(`access token: ${config.channelAccessToken}, secret: ${config.channelSecret}`);
});

app.post('/callback', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e) => {
      console.log('🚀 ~ app.post ~ e', e);
      res.status(500).end();
    });
});

const handleEvent = (e) => {
  // ignore none message or text
  if (e.type !== 'message' || e.type !== 'text') return Promise.resolve(null);

  //create a echoing text message
  const echo = { type: 'text', text: e.message.text };

  // use reply api
  return client.replyMessage(e.replyToken, echo);
};

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening app: ${port}`);
});
