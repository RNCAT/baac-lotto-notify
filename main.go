package main

import (
	"crypto/tls"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"strings"
	"syscall"

	"github.com/PuerkitoBio/goquery"
	"github.com/mileusna/crontab"
)

const (
	endPoint     = "https://notify-api.line.me/api/notify"
	baacEndPoint = "https://www.baac.or.th/salak/content-lotto.php?lotto_group=%s&start_no=%s&stop_no=%s&inside=7"

	lineToken = "rfCPhY98Umu4gNYdogxCvVKKwiKsq8QeV2GQK8dJDud"
)

var lottoNumber []string

func main() {
	lottoNumber = append(lottoNumber, getLottoResult("33", "9016879", "9017378"))
	lottoNumber = append(lottoNumber, getLottoResult("34", "2058188", "2058687"))

	ctab := crontab.New()
	// ctab.MustAddJob("* 18 16 * *", sendNotify, lottoNumber)
	// ctab.MustAddJob("30 7 * * *", sendNotify)
	ctab.MustAddJob("10 */3 * * *", sendNotify)

	stop := make(chan os.Signal)
	signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)
	<-stop
}

func getLottoResult(lottoGroup, startNo, stopNo string) string {
	http.DefaultTransport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
	endpoint := fmt.Sprintf(baacEndPoint, lottoGroup, startNo, stopNo)
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

func sendNotify() error {
	var msg string
	for _, m := range lottoNumber {
		msg += m + "\n"
	}

	form := url.Values{}
	form.Add("message", "\nยอดเงินรางวัลที่ได้ทั้งหมด: "+msg)
	log.Println("message", "\nยอดเงินรางวัลที่ได้ทั้งหมด: "+msg)

	req, err := http.NewRequest("POST", endPoint, strings.NewReader(form.Encode()))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Authorization", "Bearer "+lineToken)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()
	_, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	return nil
}
