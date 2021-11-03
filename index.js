require('dotenv').config()
const cron = require('cronitor')(`${process.env.CRONNITOR_TOKEN}`)
const nodeCron = require('node-cron')
const getLotto = require('./src/lotto')
const sendNotify = require('./src/line')

cron.wraps(nodeCron)

cron.schedule('SendLottoNotify', '1 */1 * * *', async () => {
  let lottoList = [
    {
      lottoGroup: 33,
      startNo: 9016879,
      stopNo: 9017378,
    },
    {
      lottoGroup: 34,
      startNo: 2058188,
      stopNo: 2058687,
    },
  ]
  const result = await getLotto(lottoList)
  result.forEach(async (val) => {
    await sendNotify(val)
  })
})
