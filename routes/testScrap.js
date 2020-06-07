var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
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
    number: 1,

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
var twitter = 'https://api.twitter.com/oauth/authenticate?oauth_token=2OhX6wAAAAAA-ZVUAAABchB0ChE';
var browser;

function testVideoID1(){

    (async () => {
        try {
            const videoMeta = await TikTokScraper.user('denisdang', options);
            console.log(videoMeta);
        } catch (error) {
            console.log(error);
        }
    })();
    (async () => {
        try {
            const videoMeta = await TikTokScraper.hashtagEvent('jumpgame', options);
            console.log(videoMeta);
        } catch (error) {
            console.log(error);
        }
    })();



}
function testUser(link){

    (async () => {

        const browser=await puppeteer.launch({
            headless:true,
            //  executablePath: 'D:\Tool\PhpStorm\Tiktokview\node_modules\puppeteer\.local-chromium\win64-686378\chrome-win\chrome.exe',
            args: ['--start-maximized','--disable-web-security', '--allow-running-insecure-content']},
        );
        const page = await browser.newPage();
        await page.setDefaultTimeout(0);
        await page.goto(link);
        await page.waitForSelector('[class="jsx-2763103118 main-body page-with-header"]');
        userid  = await page.evaluate(() => document.querySelector('[class="jsx-2763103118 main-body page-with-header"] script').textContent);
        console.log('User Name: ' + userid);
        let student = JSON.parse(userid);
        console.log(student.url);

    })();





}
function testVideoID(){

    (async () => {
        try {
            const posts = await TikTokScraper.user('denisdang', options);
            console.log(posts);

        } catch (error) {
            console.log(error);
        }
    })();



}
testVideoID1();

