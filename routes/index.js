var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer-extra')
const util = require('util')
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const TikTokScraper = require('tiktok-scraper');



// deo IM{Port dc ejjs dau
//thu xem dc k lai dsung require di
//chay xem
// thoi post len git di de tao clone ve xem dm xem luon di ma
// h mo thi mai tao di lam bang mat a
// post thi post me len de private
//luc lao ranh tao vao xem dc
//may dong code ghe cua m deo ai lay' ma phai so mat thi gian vl dm//post len git 1 phut// luc nao o cong ty ranh thi tao con vao xem
//h co phai cu mo cai ra ngay dau
// bao lam tu som deo lam
const options = {
    // Number of posts to scrape: {int default: 20}
    number: 50,

    // Set proxy {string[] | string default: ''}
    // http proxy: 127.0.0.1:8080
    // socks proxy: socks5://127.0.0.1:8080
    // You can pass proxies as an array and scraper will randomly select a proxy from the array to execute the requests
    proxy: '',

    // Set to {true} to search by user id: {boolean default: false}
    by_user_id: false,

    // How many post should be downloaded asynchronously. Only if {download:true}: {int default: 5}
    asyncDownload: 5,

    // How many post should be scraped asynchronously: {int default: 3}
    // Current option will be applied only with current types: music and hashtag
    // With other types it is always 1 because every request response to the TikTok API is providing the "maxCursor" value
    // that is required to send the next request
    asyncScraping: 3,

    // File path where all files will be saved: {string default: 'CURRENT_DIR'}
    filepath: `CURRENT_DIR`,

    // Custom file name for the output files: {string default: ''}
    fileName: `CURRENT_DIR`,

    // Output with information can be saved to a CSV or JSON files: {string default: 'na'}
    // 'csv' to save in csv
    // 'json' to save in json
    // 'all' to save in json and csv
    // 'na' to skip this step
    filetype: `na`,

    // Custom User-Agent
    // {string default: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36' }
    userAgent: '',

    // Download video without the watermark: {boolean default: false}
    // Set to true to download without the watermark
    // This option will affect the execution speed
    noWaterMark: false,

    // Create link to HD video: {boolean default: false}
    // This option will only work if {noWaterMark} is set to {true}
    hdVideo: false,
};
process.setMaxListeners(0);

var arr_japan = require('./clipboard_japan.js');
var fs = require("fs");
var path_NAME = "../nox/1.txt";
var arr_show=[];
var ava = [];
function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({nope: true});
    } else {
        next();
    }
}
router.use(ignoreFavicon);



let selectedUSA = "selected";
let selectedJapan = "";

function ggetHeader(){
    router.post('/', function (req, res) {
        console.log("chay vao post");
        // If it's not showing up, just use req.body to see what is actually being passed.
        let password = req.body.Mango;
        let f = req.body.username;
        let test = req.body.attributeNames;

        if(test === 'Japan')
        {
            datamain = arr_japan;
            selectedUSA = "";
            selectedJapan = "selected";

        }
        else {
            datamain = arr;
            selectedUSA = "selected";
            selectedJapan = "";
        }
        console.log("SELECTED index:" + selectedUSA);

        module.exports.selec = selectedUSA;


    });
}
function getselect(){
    console.log("getselect"+selectedUSA);
    module.exports.selec = selectedUSA;
}

var browser;

function loginFacebook(){
    (async()=>{

// Chạy browser với chế độ headless:false, tức là có giao diện
        browser=await puppeteer.launch({
            headless:true,
            //  executablePath: 'D:\Tool\PhpStorm\Tiktokview\node_modules\puppeteer\.local-chromium\win64-686378\chrome-win\chrome.exe',
            args: ['--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',   '--disable-features=site-per-process',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"']},
        );

        console.log("CONNECTED");
        // await page.waitFor(10000);

    })();
}
var each = require('async-each');


// Alternatively in browser:

loginFacebook();
ggetHeader();
var check = 0;
var item;

function test(){
    console.log("123");
}
var arr;
require('./clipboard.js')(function (err, data) {
    console.log("DA NHAN:"+ util.inspect(data, {showHidden: false, depth: null}))
    arr = JSON.parse(JSON.stringify(data));
});


function getHome(){

    router.get('/', function(req, res, next) {

        // res.send("whatever you like");
        console.log("CHAY VAO get");

        (async () => {

            res.render('index', {
                data: arr, selectedJapan: selectedJapan, selectedUSA: selectedUSA, ava: ava
            })
        })();

    });

}

getHome();

function loop(i){
    (async () => {

        try {
            var line = fs.readFileSync("D:\\Tool\\PhpStorm\\Tiktokview\\nox\\1.txt").toString().split("\r\n");
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            await page.goto('https://www.tiktok.com/@reencyngo/video/' );
            await page.waitForSelector('[class="jsx-2763103118 main-body page-with-header"]');
            var userid = await page.evaluate(() => document.querySelector('[class="jsx-2763103118 main-body page-with-header"] script').textContent);
            // console.log('User Name: ' + userid);
            let student = JSON.parse(userid);
            console.log(student);
            // var dat= {"thumbnaulUrl:" +student.thumbnailUrl[0]};
            arr_show.push(student);
            console.log("i");
            console.log("PHAN TU:" + arr_show[0]);
            check = check + 1;
            page.waitFor(5000);
            page.close();


        } catch (error) {
            console.log(error);
        }
    })();
}
function testUser(i){


    (async () => {
        var line = fs.readFileSync("D:\\Tool\\PhpStorm\\Tiktokview\\nox\\1.txt").toString().split("\r\n");

        const browser=await puppeteer.launch({
            headless:true,
            //  executablePath: 'D:\Tool\PhpStorm\Tiktokview\node_modules\puppeteer\.local-chromium\win64-686378\chrome-win\chrome.exe',

            //  executablePath: 'D:\Tool\PhpStorm\Tiktokview\node_modules\puppeteer\.local-chromium\win64-686378\chrome-win\chrome.exe',
            args: ['--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',   '--disable-features=site-per-process',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"']},
        );
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.tiktok.com/@reencyngo/video/'+arr[i].id);
        await page.waitForSelector('[class="jsx-2763103118 main-body page-with-header"]');
        userid  = await page.evaluate(() => document.querySelector('[class="jsx-2763103118 main-body page-with-header"] script').textContent);
       // console.log('User Name: ' + userid);
        student = JSON.parse(userid);

       // var dat= {"thumbnaulUrl:" +student.thumbnailUrl[0]};
        arr_show.push(student);
        console.log(arr_show[0]);

        page.waitFor(5000);
        page.close();

    })();





}


function render(res){

        if (check === 1) {
            console.log("GIA TRI NAY SE RENDER!");
            res.render('index', {
                data: arr_show, selectedJapan: selectedJapan, selectedUSA: selectedUSA
            })
        }
        else {
            console.log("CHAY LAI");
            setTimeout(function () {
                render()
            }, 0);
        }

}



module.exports = router;



