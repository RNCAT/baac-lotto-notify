const config = require('./config.json')
const cron = require('cronitor')(`${config.CRONNITOR_TOKEN}`)
const nodeCron = require('node-cron')
const getLotto = require('./src/lotto')
const sendNotify = require('./src/line')

cron.wraps(nodeCron)
cron.schedule('SendLottoNotify', '0 */6 17 * *', async () => {
  const result = await getLotto(config.lottoList)
  result.forEach(async (val) => {
    await sendNotify(val)
  })
})
