/**
 * @file qi niu upload
 */
const path = require('path');
const mime = require('mime-types');
const qiniu = require('qiniu');
const glob = require('glob');

const accessKey = 'VnCf8Joh4WN089Kg-HjK5dnSnwYYB8sdOi7DGc3z';
const secretKey = process.argv[2];

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z1;

const formUploader = new qiniu.form_up.FormUploader(config);

function uploadFile(fileName, filePath, mimeType) {
    const options = {
        scope: `hoopox:${fileName}`,
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    const putExtra = new qiniu.form_up.PutExtra();
    putExtra.mimeType = [mimeType];
    formUploader.putFile(uploadToken, fileName, filePath, putExtra, function(respErr, respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }
        if (+respInfo.statusCode === 200) {
            console.log('success', respBody.key);
        } else {
            console.log('fail', respBody);
        }
    });
}

glob.sync(path.resolve('./dist/**/*\.*')).forEach(filePath => {
    const fileName = filePath.split('dist/')[1];
    const mimeType = mime.lookup(fileName);
    console.log(`start upload ${fileName}`);
    uploadFile(fileName, filePath, mimeType);
});


