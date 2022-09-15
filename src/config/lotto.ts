const lotto = {
  baseURL: 'https://www.baac.or.th/salak/content-lotto.php',
  totalElement: 'font[class="font_tahoma font_normal"] > b',
  latestDateElement: 'font[class="font_tahoma font_normal font_link_green1"]',
  cronSchedule: process.env.CRON_SCHEDULE || '0 8 * * *',
}

export default lotto
