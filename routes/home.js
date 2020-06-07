var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const TikTokScraper = require('tiktok-scraper');
var arr= require('./clipboard.js')
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
var twitter = 'https://api.twitter.com/oauth/authenticate?oauth_token=gtJj6gAAAAAA-ZVUAAABcoWElYo';
let browser;


const Apify = require('apify');

const puppeteerOptions = {
    headless: true,
    stealth: true,
    useChrome: false,
    hideWebDriver: true,
    retireInstanceAfterIdleSecs:true,
    args: ['--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',   '--disable-features=site-per-process',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"']

};


const fs = require('fs').promises;

function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({nope: true});
    } else {
        next();
    }
}
router.use(ignoreFavicon);

function testVideoID(){


    (async () => {
        try {
            const posts = await TikTokScraper.user('denisdang', { number: 100 });
            console.log(posts['collector']);

        } catch (error) {
            console.log(error);
        }
    })();



}
//testVideoID();
//getMeta(6801741380961012993);
/* GET home page. */


function loginFacebook(){
  (async()=>{
        const cookiesString = await fs.readFile('./routes/cookies.json');
        const cookies = JSON.parse(cookiesString);
// Chạy browser với chế độ headless:false, tức là có giao diện
        browser=await Apify.launchPuppeteer(puppeteerOptions);

        const page=await browser.newPage();
      await page.setCookie(...cookies);
      console.log("CONNECTED");
// Truy cập vào trang m.facebook.com
      /*
        await page.goto(twitter);
// Nhập email vào ô đăng nhập
        await page.$eval('input[id=username_or_email]', el => el.value = "raider_no1@yahoo.com.vn");
        await page.$eval('input[id=password]', el => el.value = "Kisirongkaia91");
        await page.click('input[type="submit"]');
        await page.setViewport({
            width: 1900,
            height: 1080
        });
        console.log("CONNECTED");
        // await page.waitFor(10000);
        await page.waitFor( 2147483647);
        */
    })();
}
function postVideo(){
    router.post('/', (req, res) => {
        console.log(req.query);
        console.log(req.body.fname);
        console.log(state);
    });

}

var index;

function getVideo() {
    router.get('/:id/index/:uid', function(req, res,  next) {

       var id = req.params.id;
       var uid = req.params.uid;



        console.log(id);
        console.log(uid);



       (async()=>{

// Chạy browser với chế độ headless:false, tức là có giao diện

             const page2=await browser.newPage();


            await page2.setViewport({
                width: 1900,
                height: 1080
            });
            await page2.goto('https://www.tiktok.com/@reencyngo/video/'+id);

            //  page2.waitForNavigation({ waitUntil: 'networkidle0' });
            await page2.waitForSelector('video');

            const getImgSrc = await page2.$eval('video', img => img.getAttribute('src'));
            console.log("Videos URL: "+getImgSrc);


            var userid;

            var veri = false;
            if (await page2.$('[class="jsx-1978767526 user-username"]') !== null){


                userid  = await page2.evaluate(() => document.querySelector('[class="jsx-1978767526 user-username"]').textContent);
                console.log('User Name: ' + userid);
            }
            else{
                userid  = await page2.evaluate(() => document.querySelector('[class="jsx-1978767526 user-username verified"]').textContent);
                console.log('User Name: ' + userid);
                veri = true;
            }


            // await page2.waitForSelector('[class="jsx-1137860613 jsx-2937904534 user-info"]');


            const nickName = await page2.evaluate(() => document.querySelector('[class="jsx-1978767526 user-nickname"]').textContent);
            console.log('User Name: ' + nickName);

            const userlink = await page2.evaluate(() => document.querySelector('[class="jsx-1978767526 user-info-link"]').href);
            var userlink_arr = userlink.toString().split("@");
            var userlinkID = userlink_arr[1];
            console.log('User ID: ' + userlinkID);


            const avatar = await page2.evaluate(() =>
                Array.from(document.querySelectorAll('[class="jsx-581822467 jsx-1220456536 jsx-4193737826 avatar"] img'),
                    e => e.src));
            console.log("Avatar: " + avatar);

            const des = await page2.evaluate(() =>
                Array.from(document.querySelectorAll('[class="jsx-826035919 video-meta-title"]'),
                    e => e.textContent));
            console.log(des);


            // await page2.screenshot({path: 'example.png', fullPage: true});





            const music = await page2.evaluate(() =>
                Array.from(document.querySelectorAll('[class="jsx-2923443248 music-info"]'),
                    e => e.textContent));

            console.log(music);
            const music_link = await page2.evaluate(() =>
                Array.from(document.querySelectorAll('[class="jsx-2923443248 music-info"] a'),
                    e => e.href));


            var  music_array  = music_link.toString().split("-");
            var musicid = music_array[music_array.length-1];
            console.log("MusicID:" + music_link);
            var heart = await page2.evaluate(() =>
                Array.from(document.querySelectorAll('[class="jsx-1026994272 like-text"]'),
                    e => e.textContent));
            console.log(heart);
            var commentCount = await page2.evaluate(() =>
                Array.from(document.querySelectorAll('[class="jsx-1026994272 comment-text"]'),
                    e => e.textContent));
            console.log("commentcount"+commentCount);


            var ava_user;   var   user_comment_link; var user_comment_id_arr=[]; var user_comment_id;
            var user_name;
            if (commentCount.toString() !== '0'){
                await page2.waitForSelector('[class="jsx-86236896 jsx-630386149 user-avatar"]',{visible: true});
                await page2.waitForSelector('[class="jsx-86236896 jsx-630386149 comment-text"]',{visible: true});

                user_name = await page2.evaluate(() =>
                    Array.from(document.querySelectorAll('[class="jsx-86236896 jsx-630386149 username"]'),
                        e => e.textContent));

                const index = user_name.indexOf(' · ');
                if (index > -1) {
                    user_name.splice(index, 1);
                }
                console.log(user_name);


                ava_user = await page2.evaluate(() =>
                    Array.from(document.querySelectorAll('[class="jsx-581822467 jsx-1220456536 jsx-4193737826 avatar comment-avatar"] img'),
                        e => e.src));

                console.log(ava_user);

                user_comment_link = await page2.evaluate(() =>
                    Array.from(document.querySelectorAll('[class="jsx-86236896 jsx-630386149 user-info"]'),
                        e => e.href));

                for(var i =0;i< user_comment_link.length;i++){
                    user_comment_id = user_comment_link[i].toString().split("/")[3].replace("@","");
                    user_comment_id_arr.push(user_comment_id);
                }


                var comments;

                comments = await page2.evaluate(() =>
                    Array.from(document.querySelectorAll('[class="jsx-86236896 jsx-630386149 comment-text"]'),
                        e => e.textContent));

                console.log(comments);

                for( var i = 0; i < comments.length; i++){
                    if ( comments[i] === ' · ') {
                        comments.splice(i, 1);
                    }
                    var line_comment = comments[i].split(' ');
                    // console.log(line_comment);
                    var first2;
                    if(line_comment[line_comment.length-2].trim() === 'ago'){
                        first2 = line_comment.splice(0, line_comment.length-3); // first2 is [ "a", "b" ]
                        comments[i] = comments[i].substring(0,comments[i].toString().lastIndexOf(" "));
                        comments[i] =   comments[i].substring(0,comments[i].toString().lastIndexOf(" "));
                        comments[i] =   comments[i].substring(0,comments[i].toString().lastIndexOf(" "));

                    }
                    else{
                        first2 = line_comment.splice(0, line_comment.length-1); // first2 is [ "a", "b" ]
                        comments[i] = comments[i].substring(0,comments[i].toString().lastIndexOf(" "));
                    }
                    //total_comment.push(comments[i]);
                    //console.log(comments[i]);
                }

                console.log(comments);

            }
            else{
                console.log("KHONG CO COMMENT!");
            }
            res.render('home',{
                data:{video:getImgSrc, user:userid, avatar:avatar, comment:comments,
                    nickname:nickName,usercomment:user_name, usercommentid:user_comment_id_arr,
                    des:des, music:music, avaUser:ava_user, heart:heart, commentCount:commentCount, veri:veri, music_link:musicid, userlink:userlinkID,index:uid,idvideo:id
         }});


           await page2.waitFor(600000);
           await page2.close();
        })();


    })
}

module.exports = router;



loginFacebook();
getVideo();