const config = require('../config.json')
const axios = require('axios')
const qs = require('querystring')

const sendNotify = async (lotto) => {
  const URL = 'https://notify-api.line.me/api/notify'
  const { lottoNo, result } = lotto
  const message = `\nสลากหมายเลข : \n${lottoNo}\nวันที่ถูกรางวัลล่าสุด : \n${result.lastDate}\nยอดเงินรวมตั้งแต่งวดเเรก : \n${result.total} บาท`

  try {
    const sendLine = await axios.post(URL, qs.stringify({ message }), {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${config.LINE_TOKEN}`,
      },
    })

    console.log(sendLine.data)
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendNotify
