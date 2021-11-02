require('dotenv').config()
const schedule = require('node-schedule')
const getLotto = require('./src/lotto')
const sendNotify = require('./src/line')
const rule = new schedule.RecurrenceRule()
rule.hour = 7
rule.tz = 'Asia/Bangkok'

schedule.scheduleJob(rule, async () => {
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
