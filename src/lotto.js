const axios = require('axios')
const cheerio = require('cheerio')
const https = require('https')

const getLotto = async (lottoList) => {
  const config = {
    httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: false }),
  }

  let ResultList = []

  for (let i = 0; i < lottoList.length; i++) {
    const URL = `http://www.baac.or.th/salak/content-lotto.php?lotto_group=${lottoList[i].lottoGroup}&start_no=${lottoList[i].startNo}&stop_no=${lottoList[i].stopNo}&inside=7`
    const { data } = await axios.get(URL, config)

    const results = await scrape(data)

    const result = {
      lottoNo: `${lottoList[i].startNo}-${lottoList[i].stopNo}`,
      result: results,
    }

    console.log(result)

    ResultList.push(result)
  }

  return ResultList
}

const getLastDate = async ($, html) => {
  const lastDate = await $(
    'font[class="font_tahoma font_normal font_link_green1"]',
    html
  )
    .last()
    .text()
    .split(' ')

  lastDate.forEach((val, idx) => {
    switch (lastDate[idx]) {
      case '':
      case '\n':
      case '::':
        delete lastDate[idx]
        break
    }
  })

  const filtered = lastDate
    .filter(function (el) {
      return el != null
    })
    .slice(3)

  let date = ''

  filtered.forEach((val, idx) => {
    date += `${val} `
  })

  return date
}

const getTotal = async ($, html) => {
  const total = await $('font[class="font_tahoma font_normal"] > b', html)
    .last()
    .text()

  return total.split('.')[0]
}

const scrape = async (html) => {
  const $ = cheerio.load(html)
  const lastDate = await getLastDate($, html)
  const total = await getTotal($, html)

  return { lastDate, total }
}

module.exports = getLotto
