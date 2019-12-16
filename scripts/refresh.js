/**
 * @file qi niu upload
 */
const path = require('path');
const qiniu = require('qiniu');
const glob = require('glob');

const accessKey = 'VnCf8Joh4WN089Kg-HjK5dnSnwYYB8sdOi7DGc3z';
const secretKey = process.argv[2];;

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const cdnManager = new qiniu.cdn.CdnManager(mac);

const files = glob.sync(path.resolve('./dist/**/*\.*')).map(filePath => {
    const fileName = filePath.split('dist/')[1];
    return `https://hoopox.com/${fileName}`;
});

function refresh(files) {
    cdnManager.refreshUrls(files, function(err, respBody, respInfo) {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(respInfo.statusCode);
        if (+respInfo.statusCode === 200) {
            const jsonBody = JSON.parse(respBody);
            console.log('refresh', jsonBody);
        }
    });
}

function fetch(files) {
    cdnManager.prefetchUrls(files, function(err, respBody, respInfo) {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(respInfo.statusCode);
        if (+respInfo.statusCode === 200) {
            const jsonBody = JSON.parse(respBody);
            console.log('fetch', jsonBody);
        }
    });
}

async function init() {
    for (let i = 0; i < files.length; i += 50) {
        // console.log(`start fetch from ${i} to ${i + 50}`);
        // fetch(files.slice(i, i + 50));
        await new Promise(resolve => {
            setTimeout(resolve, 30000);
        });
        console.log(`start refresh from ${i} to ${i + 50}`);
        refresh(files.slice(i, i + 50));
        await new Promise(resolve => {
            setTimeout(resolve, 30000);
        });
    }
}

init();
