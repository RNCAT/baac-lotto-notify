# BaacLotto-Notify
ระบบแจ้งเตือนผลสลาก ธกส.
โดยจะส่งแจ้งเตือนทุกวันที่ 17

> This project was discontinued because they have this feature in [mobile application](https://play.google.com/store/apps/details?id=com.ccpp.baac).

### วิธีใช้งาน

- แก้ไขไฟล์ config.json
- สมัคร Cronitor และนำ API key มาใส่ [Cronitor](https://cronitor.io/)
- ใส่ Line Token [LINE Notify](https://notify-bot.line.me/en/)
- ใส่ข้อมูลสลากลงใน lottoList

```json
{
  "CRONNITOR_TOKEN": "YOUR_CRONNITOR_TOKEN",
  "LINE_TOKEN": "YOUR_LINE_NOTIFY_TOKEN",
  "lottoList": [
    {
      "lottoGroup": 34,
      "startNo": 2058188,
      "stopNo": 2058687
    },
    {
      "lottoGroup": 00,
      "startNo": 0000000,
      "stopNo": 0000000
    }
  ]
}

```

### เลข lottoGroup

- 36 = สลากทวีสิน เกษตรมั่นคง 3 (RA-RT)
- 35 = สลากออมทรัพย์เกษตรยั่งยืน
- 34 = สลากธ.ก.ส.ชุดเกษตรมั่งคั่ง4(ป0-ศ9)
- 33 = สลาก ธ.ก.ส.ชุดเกษตรมั่งคั่ง 3(ด0-บ9)
- 32 = สลากทวีสิน เกษตรมั่นคง 2 (PH-PQ)
- 31 = สลากธ.ก.ส.ชุดเกษตรมั่งคั่ง2(ช0-ณ9)
- 30 = สลากธ.ก.ส.ชุดเกษตรมั่งคั่ง(ก0-ฉ9)
- 29 = สลากทวีสิน ชุดเกษตรมั่นคง(PA-PG)
- 28 = สลาก ธ.ก.ส.ชุดที่ 4(P0-U9)
- 27 = สลากธ.ก.ส. ชุด 3 (I0-N9)
- 26 = ชุดกล้วยไม้นานาชาติ (NM-NW)
- 25 = สลาก ธ.ก.ส. ชุด 2 (C0-H9)
- 24 = สลากทวีสิน 2558 (NG-NL)
- 23 = สลาก ธ.ก.ส. ชุด 1 (01-60)
- 22 = สลากทวีสิน ชุด 2557 (NA-NF)
- 21 = ขวัญแผ่นดิน (M0-MU)
- 20 = บัตรเพิ่มทรัพย์ ชุดที่ 9 (B0-B9)
- 19 = บัตรเพิ่มทรัพย์ ชุดที่ 8 (A0-A9)
- 18 = ข้าวทิพย์ (MH- MN)
- 17 = กล้วยไม้พระนาม (MA-MG)
- 16 = บัตรเพิ่มทรัพย์ ชุดที่ 7 (BK-BT)
- 15 = บัตรเพิ่มทรัพย์ ชุดที่ 6 (BA-BJ)
- 14 = ขวัญข้าว 2 (LN-LT)
- 13 = ขวัญข้าว (LG-LM)
