var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const TikTokScraper = require('tiktok-scraper');

function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({nope: true});
    } else {
        next();
    }
}
router.use(ignoreFavicon);

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

function testUser(){

    router.get('/:id', function(req, res) {
        id = req.params.id;

        (async () => {

            const browser = await puppeteer.launch({
                    headless: true,
                    //  executablePath: 'D:\Tool\PhpStorm\Tiktokview\node_modules\puppeteer\.local-chromium\win64-686378\chrome-win\chrome.exe',
                    args: ['--disable-web-security', '--allow-running-insecure-content', '--disable-gl-drawing-for-tests']
                },
            );
            const page = await browser.newPage();
           // await page.setDefaultTimeout(0);
            await page.goto('https://tikitoks.com/search/users/'+id);
            await page.setViewport({
                width: 1900,
                height: 1080
            });

            //  await page.waitForSelector('[class="jsx-3803832025 download-wrapper"]');
            //  await page.$eval('input[name=search]', el => el.value = "thuy trang");
            //  await page.click('button[type="submit"]');
            await page.waitForSelector('[class="profile"] a img', {visible: true});

            const user = await page.evaluate(() =>
                Array.from(document.querySelectorAll('[class="nickname"]'),
                    e => e.textContent));
            console.log("USER:" + user);
            const ava = await page.evaluate(() =>
                Array.from(document.querySelectorAll('[class="head-portrait"]'),
                    e => e.src));
            var array_ava = [];
         for(var i =0;i< ava.length;i++){
             var ava_hd = ava[i].toString().replace("100x100","720x720");
             array_ava.push(ava_hd);
         }
            console.log("USER:" + array_ava);

            var array_vid=[];
            const vid = await page.evaluate(() =>
                Array.from(document.querySelectorAll('[class="info"] span'),
                    e => e.textContent));

            for(var i =0;i< vid.length;i++){
                var vid_hd = vid[i].toString().replace("Videos","");
                if(vid_hd !== ""){
                    array_vid.push(vid_hd);
                }

            }
            console.log("USER:" + array_vid);
var follow = [];
var follow_detail;
            const following = await page.evaluate(() =>
                Array.from(document.querySelectorAll('[class="data"] p strong'),
                    e => e.textContent));
            for(var i= 0;i< following.length;i++){
                follow_detail = following[i].split(",");

            }
            console.log("USER:" + following);

            res.render('searchUser', {
                data: {
                   user:user, ava:array_ava , vid:array_vid,following:following,
                }
            });

            page.waitFor(5000);
            page.close();
        })();

    })

}

testUser();
//getMeta(6801741380961012993);
/* GET home page. */



function getVideo() {
    router.get('/:id', function (req, res) {
        id = req.params.id;
        console.log(id);
        (async () => {

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setDefaultTimeout(0);




            const avatar = await page.evaluate(() =>
                Array.from(document.querySelectorAll('[class="jsx-3957300394 jsx-203739285 jsx-2517402465 avatar"] img'),
                    e => e.src));

            console.log("Avatar Link:" + avatar);

            res.render('video', {
                data: {video: getImgSrc, user: textContent, avatar: avatar}
            });
        })();

    })
}



module.exports = router;
