const linebot = require('linebot')

const bot = linebot({
  channelId: '', // 替換成你的CHANNEL_ID
  channelSecret: '', // 替換成你的CHANNEL_SECRET
  channelAccessToken: '' // 替換成你的CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  const replyMessage = `你剛剛說： ${event.message.text} ?`

  event
    .reply(replyMessage)
    .then(data => {
      console.log('🚀 ~ e.reply ~ data', data);
      console.log('成功發送訊息')
    })
    .catch(err => {
      console.log('🚀 ~ bot.on ~ err', err);
    })
})

bot.listen('/linewebhook', 3000, () => {
  console.log('line bot 已開啟')
})
