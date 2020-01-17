// https://portal.qiniu.com/kodo/bucket/resource?bucketName=fairyever
// https://developer.qiniu.com/kodo/manual/1235/vars#magicvar

const qiniu = require('qiniu')

const fileName = name => 'wdbc-awesome' + name

const accessKey = global.AK
const secretKey = global.SK
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

async function upload ({
  filePath,
  filePathFull
}) {
  return new Promise((resolve, reject) => {
    console.log(`[ upload ] ${filePathFull}`)
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: 'fairyever' + ':' + fileName(filePath),
      returnBody: '{"height":$(imageInfo.height), "width":$(imageInfo.width), "uuid":$(uuid)}'
    })
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z0
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    formUploader.putFile(
      putPolicy.uploadToken(mac),
      fileName(filePath),
      filePathFull,
      putExtra,
      function(respErr, respBody, respInfo) {
        if (respErr) return reject(respErr)
        if (respInfo.statusCode == 200) resolve(respBody)
        else reject(new Error(respBody))
      }
    )
  })
}

module.exports = upload
