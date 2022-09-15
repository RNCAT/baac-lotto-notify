import puppeteer from 'puppeteer'
import { load } from 'cheerio'
import cron from 'node-cron'
import axios from 'axios'
import { stringify } from 'node:querystring'
import 'dotenv/config'

import config from './config'

async function getLotto(group: string, start: string, stop: string) {
  const lottoURL = `${config.lotto.baseURL}?lotto_group=${group}&start_no=${start}&stop_no=${stop}&inside=7`

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(lottoURL)

  const pageData = await page.evaluate(() => ({
    html: document.documentElement.innerHTML,
  }))

  const $ = load(pageData.html)
  const total = $(config.lotto.totalElement).last().text()
  const latestDate = $(config.lotto.latestDateElement)
    .last()
    .text()
    .replace(/\s/g, '')
    .replace('::วันที่', ' ')
    .split(' ')[1]

  await browser.close()

  return { total, latestDate }
}

async function sendLine(message: string) {
  try {
    const { data } = await axios.post(
      config.line.baseURL,
      stringify({ message }),
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${config.line.token}`,
        },
      }
    )

    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

cron.schedule(config.lotto.cronSchedule, async () => {
  const { latestDate, total } = await getLotto('34', '2058188', '2058687')
  const message = `\nวันที่ถูกรางวัลล่าสุด: \n${latestDate}\nยอดเงินรวมตั้งแต่งวดเเรก: \n${total} บาท`

  await sendLine(message)
})
