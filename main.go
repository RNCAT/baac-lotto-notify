package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/mileusna/crontab"
)

var lineToken = "YOURTOKEN"
var lottoNumber []string

func main() {
	lottoNumber = append(lottoNumber, getLottoResult("33", "9016879", "9017378"))

	ctab := crontab.New()
	ctab.MustAddJob("* 18 16 * *", sendNotify, lottoNumber)
	time.Sleep(10 * time.Minute)
}

func getLottoResult(lottoGroup, startNo, stopNo string) string {
	endpoint := fmt.Sprintf("https://www.baac.or.th/salak/content-lotto.php?lotto_group=%s&start_no=%s&stop_no=%s&inside=7", lottoGroup, startNo, stopNo)
	resp, err := http.Get(endpoint)
	if err != nil {
		log.Fatal(err)
	}

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	result := startNo + "-" + stopNo + "= "
	doc.Find("b").Each(func(i int, s *goquery.Selection) {
		if strings.HasSuffix(s.Text(), ".00") {
			result += s.Text() + " บาท"
		}
	})
	return result
}

func sendNotify(message []string) {
	endpoint := "https://notify-api.line.me/api/notify"
	client := http.Client{}

	msg := ""
	for _, m := range lottoNumber {
		msg += m + "\n"
	}

	form := url.Values{}
	form.Add("message", "\nยอดเงินรางวัลที่ได้ทั้งหมด: "+msg)

	req, err := http.NewRequest("POST", endpoint, strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Authorization", "Bearer "+lineToken)
	if err != nil {
		log.Fatal(err)
	}

	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	bodyResp, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	log.Println(string(bodyResp))
}
